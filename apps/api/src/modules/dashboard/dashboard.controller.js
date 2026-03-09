import { Category } from "../categories/category.model.js";
import { Customer } from "../customers/customer.model.js";
import { Order } from "../orders/order.model.js";
import { Product } from "../products/product.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export const getDashboardSummary = asyncHandler(async (_req, res) => {
  const now = new Date();
  const sevenDaysAgo = getDateDaysAgo(7);
  const thirtyDaysAgo = getDateDaysAgo(30);

  const [
    totalProducts,
    totalCategories,
    totalCustomers,
    newCustomersLast30Days,
    totalOrders,
    recentOrders,
    revenueResult,
    topProducts,
    pendingOrders,
  ] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments({ isActive: true }),
    Customer.countDocuments(),
    Customer.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
    Order.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5),
    Order.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]),
    Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          name: { $first: "$items.name" },
          quantitySold: { $sum: "$items.quantity" },
          revenue: { $sum: "$items.lineTotal" },
        },
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 5 },
    ]),
    Order.countDocuments({
      orderStatus: { $in: ["pending", "confirmed", "shipping"] },
    }),
  ]);

  const recentRevenue = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sevenDaysAgo, $lte: now },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        revenue: { $sum: "$totalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    success: true,
    message: "Dashboard summary fetched successfully",
    data: {
      overview: {
        totalProducts,
        totalCategories,
        totalCustomers,
        newCustomersLast30Days,
        totalOrders,
        pendingOrders,
        totalRevenue: revenueResult[0]?.revenue || 0,
      },
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        orderCode: order.orderCode,
        customerName: order.customerName,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      })),
      topProducts,
      recentRevenue,
    },
  });
});
