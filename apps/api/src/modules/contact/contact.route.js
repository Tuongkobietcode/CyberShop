import { Router } from "express";
import {
  submitContactInquiry,
  getContactInquiries,
  deleteContactInquiry,
} from "./contact.controller.js";

export const contactRouter = Router();

contactRouter.post("/", submitContactInquiry); // user gửi
contactRouter.get("/", getContactInquiries); // admin lấy list
contactRouter.delete("/:id", deleteContactInquiry); // admin xoá
