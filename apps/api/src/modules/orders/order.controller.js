import { Customer } from "../customers/customer.model.js";
import { Product } from "../products/product.model.js";
import { Order } from "./order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { buildMeta, getPagination } from "../../utils/pagination.js";
import { createHttpError } from "../../utils/createHttpError.js";
import { generateOrderCode } from "../../utils/orderCode.js";

function sanitizeOrder(order) {
  return {
    id: order.id,
    orderCode: order.orderCode,
    customerId: order.customerId,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    items: order.items,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    discountAmount: order.discountAmount,
    totalAmount: order.totalAmount,
    note: order.note,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

async function resolveCustomer(customerPayload, shippingAddress) {
  const phone = String(customerPayload.phone || shippingAddress.phone || "").trim();
  const email = String(customerPayload.email || "").trim().toLowerCase();
  const name = String(customerPayload.name || shippingAddress.fullName || "").trim();

  if (!name || !phone) {
    throw createHttpError(400, "Customer name and phone are required");
  }

  let customer = await Customer.findOne({
    $or: [{ phone }, ...(email ? [{ email }] : [])],
  });

  if (!customer) {
    customer = await Customer.create({
      name,
      email,
      phone,
      addresses: [
        {
          ...shippingAddress,
          isDefault: true,
        },
      ],
    });
  } else {
    customer.name = name;
    customer.email = email || customer.email;
    customer.phone = phone;

    const existingAddressIndex = customer.addresses.findIndex(
      (address) =>
        address.addressLine1 === shippingAddress.addressLine1 &&
        address.city === shippingAddress.city &&
        address.phone === shippingAddress.phone
    );

    if (existingAddressIndex === -1) {
      customer.addresses.unshift({
        ...shippingAddress,
        isDefault: customer.addresses.length === 0,
      });
    }

    await customer.save();
  }

  return customer;
}

async function buildOrderItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw createHttpError(400, "Order items are required");
  }

  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (!product || product.status !== "active") {
      throw createHttpError(400, "One or more products are unavailable");
    }

    const quantity = Number(item.quantity);

    if (!quantity || quantity < 1) {
      throw createHttpError(400, "Item quantity must be at least 1");
    }

    if (product.stock < quantity) {
      throw createHttpError(400, `Insufficient stock for ${product.name}`);
    }

    orderItems.push({
      product,
      quantity,
      lineTotal: product.price * quantity,
    });
  }

  return orderItems;
}

export const createOrder = asyncHandler(async (req, res) => {
  const customerPayload = req.body.customer || {};
  const shippingAddress = req.body.shippingAddress || {};
  const paymentMethod = String(req.body.paymentMethod || "").trim();
  const note = String(req.body.note || "").trim();

  if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city) {
    throw createHttpError(400, "Shipping address is incomplete");
  }

  if (!["cod", "bank_transfer", "card"].includes(paymentMethod)) {
    throw createHttpError(400, "Unsupported payment method");
  }

  const customer = await resolveCustomer(customerPayload, shippingAddress);
  const orderItems = await buildOrderItems(req.body.items);

  const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingFee = subtotal >= 1000000 ? 0 : 30000;
  const discountAmount = 0;
  const totalAmount = subtotal + shippingFee - discountAmount;

  const order = await Order.create({
    orderCode: generateOrderCode(),
    customerId: customer._id,
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone,
    items: orderItems.map(({ product, quantity, lineTotal }) => ({
      productId: product._id,
      name: product.name,
      sku: product.sku,
      image: product.images[0]?.url || "",
      quantity,
      unitPrice: product.price,
      lineTotal,
    })),
    shippingAddress: {
      fullName: String(shippingAddress.fullName).trim(),
      phone: String(shippingAddress.phone).trim(),
      addressLine1: String(shippingAddress.addressLine1).trim(),
      addressLine2: String(shippingAddress.addressLine2 || "").trim(),
      ward: String(shippingAddress.ward || "").trim(),
      district: String(shippingAddress.district || "").trim(),
      city: String(shippingAddress.city).trim(),
      country: String(shippingAddress.country || "Vietnam").trim(),
      postalCode: String(shippingAddress.postalCode || "").trim(),
    },
    paymentMethod,
    subtotal,
    shippingFee,
    discountAmount,
    totalAmount,
    note,
  });

  for (const item of orderItems) {
    item.product.stock -= item.quantity;
    if (item.product.stock === 0) {
      item.product.status = "out_of_stock";
    }
    await item.product.save();
  }

  customer.orderCount += 1;
  customer.totalSpend += totalAmount;
  await customer.save();

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: sanitizeOrder(order),
  });
});

export const listAdminOrders = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);
  const search = String(req.query.search || "").trim();
  const orderStatus = String(req.query.orderStatus || "").trim();
  const paymentStatus = String(req.query.paymentStatus || "").trim();
  const filter = {};

  if (search) {
    filter.$or = [
      { orderCode: { $regex: search, $options: "i" } },
      { customerName: { $regex: search, $options: "i" } },
      { customerEmail: { $regex: search, $options: "i" } },
      { customerPhone: { $regex: search, $options: "i" } },
    ];
  }

  if (orderStatus) {
    filter.orderStatus = orderStatus;
  }

  if (paymentStatus) {
    filter.paymentStatus = paymentStatus;
  }

  const [items, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);

  res.json({
    success: true,
    message: "Orders fetched successfully",
    data: items.map(sanitizeOrder),
    meta: buildMeta(page, limit, total),
  });
});

export const getAdminOrderDetail = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw createHttpError(404, "Order not found");
  }

  res.json({
    success: true,
    message: "Order fetched successfully",
    data: sanitizeOrder(order),
  });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw createHttpError(404, "Order not found");
  }

  const nextOrderStatus = String(req.body.orderStatus || "").trim();
  const nextPaymentStatus = String(req.body.paymentStatus || "").trim();

  if (nextOrderStatus) {
    order.orderStatus = nextOrderStatus;
  }

  if (nextPaymentStatus) {
    order.paymentStatus = nextPaymentStatus;
  }

  await order.save();

  res.json({
    success: true,
    message: "Order status updated successfully",
    data: sanitizeOrder(order),
  });
});
