import { asyncHandler } from "../../utils/asyncHandler.js";
import { createHttpError } from "../../utils/createHttpError.js";
import { ContactInquiry } from "./contact.model.js";

/* USER gửi contact */
export const submitContactInquiry = asyncHandler(async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "")
    .trim()
    .toLowerCase();
  const subject = String(req.body.subject || "").trim();
  const message = String(req.body.message || "").trim();

  if (!name || !email || !subject || !message) {
    throw createHttpError(
      400,
      "Name, email, subject, and message are required",
    );
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

/* ADMIN lấy danh sách contact */
export const getContactInquiries = asyncHandler(async (req, res) => {
  const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: inquiries,
  });
});

/* ADMIN xoá contact */
export const deleteContactInquiry = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.findById(req.params.id);

  if (!inquiry) {
    throw createHttpError(404, "Inquiry not found");
  }

  await inquiry.deleteOne();

  res.json({
    success: true,
    message: "Inquiry deleted successfully",
  });
});
