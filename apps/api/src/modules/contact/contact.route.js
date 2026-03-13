import { Router } from "express";
import { submitContactInquiry } from "./contact.controller.js";

export const contactRouter = Router();

contactRouter.post("/", submitContactInquiry);
