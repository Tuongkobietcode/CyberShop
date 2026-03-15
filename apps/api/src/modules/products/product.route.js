import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  listAdminProducts,
  listProducts,
  updateProduct,
} from "./product.controller.js";
import {
  createProductReview,
  listProductReviews,
} from "./review.controller.js";
import { requireCustomerAuth } from "../../middlewares/requireCustomerAuth.js";
import { requireAdminAuth } from "../../middlewares/requireAdminAuth.js";

export const productRouter = Router();
export const adminProductRouter = Router();

productRouter.get("/", listProducts);
productRouter.get("/:slug", getProductDetail);
productRouter.get("/:slug/reviews", listProductReviews);
productRouter.post("/:slug/reviews", requireCustomerAuth, createProductReview);

adminProductRouter.use(requireAdminAuth);
adminProductRouter.get("/", listAdminProducts);
adminProductRouter.post("/", createProduct);
adminProductRouter.patch("/:id", updateProduct);
adminProductRouter.delete("/:id", deleteProduct);
