import { Router } from "express";
import {
  createOrder,
  getAdminOrderDetail,
  listAdminOrders,
  updateOrderStatus,
} from "./order.controller.js";
import { requireAdminAuth } from "../../middlewares/requireAdminAuth.js";

export const orderRouter = Router();
export const adminOrderRouter = Router();

orderRouter.post("/", createOrder);

adminOrderRouter.use(requireAdminAuth);
adminOrderRouter.get("/", listAdminOrders);
adminOrderRouter.get("/:id", getAdminOrderDetail);
adminOrderRouter.patch("/:id/status", updateOrderStatus);
