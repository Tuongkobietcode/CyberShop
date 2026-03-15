import { Product } from "./product.model.js";
import { ProductReview } from "./review.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createHttpError } from "../../utils/createHttpError.js";
import { buildMeta, getPagination } from "../../utils/pagination.js";

function sanitizeReview(review) {
  const customer =
    review.customerId && typeof review.customerId === "object"
      ? {
          id: review.customerId.id,
          name: review.customerId.name,
        }
      : null;

  return {
    id: review.id,
    productId: String(review.productId),
    customer,
    rating: review.rating,
    content: review.content,
    photos: review.photos || [],
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
}

export const listProductReviews = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const product = await Product.findOne({
    slug: req.params.slug,
    status: "active",
  }).select("_id");

  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  const [items, total] = await Promise.all([
    ProductReview.find({ productId: product._id })
      .populate("customerId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    ProductReview.countDocuments({ productId: product._id }),
  ]);

  res.json({
    success: true,
    message: "Product reviews fetched successfully",
    data: items.map(sanitizeReview),
    meta: buildMeta(page, limit, total),
  });
});

export const createProductReview = asyncHandler(async (req, res) => {
  const rating = Number(req.body.rating);
  const content = String(req.body.content || "").trim();

  if (!rating || !content) {
    throw createHttpError(400, "Rating and content are required");
  }

  if (rating < 1 || rating > 5) {
    throw createHttpError(400, "Rating must be between 1 and 5");
  }

  const product = await Product.findOne({
    slug: req.params.slug,
    status: "active",
  }).select("_id");

  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  const review = await ProductReview.create({
    productId: product._id,
    customerId: req.customer._id,
    rating,
    content,
    photos: Array.isArray(req.body.photos) ? req.body.photos : [],
  });

  await review.populate("customerId", "name");

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: sanitizeReview(review),
  });
});

