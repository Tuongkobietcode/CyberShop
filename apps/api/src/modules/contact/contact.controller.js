import { asyncHandler } from "../../utils/asyncHandler.js";
import { createHttpError } from "../../utils/createHttpError.js";
import { ContactInquiry } from "./contact.model.js";

export const submitContactInquiry = asyncHandler(async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const subject = String(req.body.subject || "").trim();
  const message = String(req.body.message || "").trim();

  if (!name || !email || !subject || !message) {
    throw createHttpError(400, "Name, email, subject, and message are required");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw createHttpError(400, "Email is not valid");
  }

  const inquiry = await ContactInquiry.create({
    name,
    email,
    subject,
    message,
    source: "website",
  });

  res.status(201).json({
    success: true,
    message: "Inquiry submitted successfully",
    data: {
      id: inquiry.id,
      status: inquiry.status,
      createdAt: inquiry.createdAt,
    },
  });
});
