import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/db.js";
import { Customer } from "../modules/customers/customer.model.js";

dotenv.config();

const customers = [
  {
    name: "Nguyen Minh Anh",
    email: "minhanh@cybershop.com",
    phone: "0901000001",
    status: "vip",
    totalSpend: 0,
    orderCount: 0,
    addresses: [
      {
        fullName: "Nguyen Minh Anh",
        phone: "0901000001",
        addressLine1: "12 Nguyen Hue",
        addressLine2: "District 1",
        ward: "Ben Nghe",
        district: "District 1",
        city: "Ho Chi Minh City",
        country: "Vietnam",
        postalCode: "700000",
        isDefault: true,
      },
    ],
  },
  {
    name: "Tran Bao Chau",
    email: "baochau@cybershop.com",
    phone: "0901000002",
    status: "active",
    totalSpend: 0,
    orderCount: 0,
    addresses: [
      {
        fullName: "Tran Bao Chau",
        phone: "0901000002",
        addressLine1: "48 Le Loi",
        addressLine2: "",
        ward: "Hai Chau 1",
        district: "Hai Chau",
        city: "Da Nang",
        country: "Vietnam",
        postalCode: "550000",
        isDefault: true,
      },
    ],
  },
  {
    name: "Pham Quoc Viet",
    email: "quocviet@cybershop.com",
    phone: "0901000003",
    status: "active",
    totalSpend: 0,
    orderCount: 0,
    addresses: [
      {
        fullName: "Pham Quoc Viet",
        phone: "0901000003",
        addressLine1: "101 Tran Phu",
        addressLine2: "",
        ward: "Loc Tho",
        district: "Nha Trang",
        city: "Khanh Hoa",
        country: "Vietnam",
        postalCode: "650000",
        isDefault: true,
      },
    ],
  },
  {
    name: "Le Thu Trang",
    email: "thutrang@cybershop.com",
    phone: "0901000004",
    status: "inactive",
    totalSpend: 0,
    orderCount: 0,
    addresses: [
      {
        fullName: "Le Thu Trang",
        phone: "0901000004",
        addressLine1: "22 Vo Van Tan",
        addressLine2: "",
        ward: "Ward 6",
        district: "District 3",
        city: "Ho Chi Minh City",
        country: "Vietnam",
        postalCode: "700000",
        isDefault: true,
      },
    ],
  },
];

async function seedCustomers() {
  await connectDatabase(process.env.MONGODB_URI);

  const phones = customers.map((item) => item.phone);
  await Customer.deleteMany({ phone: { $nin: phones } });

  for (const item of customers) {
    await Customer.findOneAndUpdate(
      { phone: item.phone },
      item,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  console.log(`Seeded ${customers.length} customers`);
}

seedCustomers()
  .catch((error) => {
    console.error("Customer seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
