import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductDetail,
  listAdminProducts,
  listProducts,
  updateProduct,
} from "./product.controller.js";
import { requireAdminAuth } from "../../middlewares/requireAdminAuth.js";

export const productRouter = Router();
export const adminProductRouter = Router();

productRouter.get("/", listProducts);
productRouter.get("/:slug", getProductDetail);

adminProductRouter.use(requireAdminAuth);
adminProductRouter.get("/", listAdminProducts);
adminProductRouter.post("/", createProduct);
adminProductRouter.patch("/:id", updateProduct);
adminProductRouter.delete("/:id", deleteProduct);
