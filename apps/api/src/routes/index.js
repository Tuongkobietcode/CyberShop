import { Router } from "express";
import { healthRouter } from "../modules/health/health.route.js";
import { authRouter } from "../modules/auth/auth.route.js";
import {
  adminCategoryRouter,
  categoryRouter,
} from "../modules/categories/category.route.js";
import {
  adminProductRouter,
  productRouter,
} from "../modules/products/product.route.js";
import { customerRouter } from "../modules/customers/customer.route.js";
import {
  adminOrderRouter,
  orderRouter,
} from "../modules/orders/order.route.js";
import { dashboardRouter } from "../modules/dashboard/dashboard.route.js";

export const apiRouter = Router();
const adminRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);

adminRouter.use("/categories", adminCategoryRouter);
adminRouter.use("/products", adminProductRouter);
adminRouter.use("/customers", customerRouter);
adminRouter.use("/orders", adminOrderRouter);
adminRouter.use("/dashboard", dashboardRouter);

apiRouter.use("/admin", adminRouter);
