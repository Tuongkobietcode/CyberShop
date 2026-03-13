import React, { useEffect, useState } from "react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const ContactinquiriesPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const data: Inquiry[] = [
      {
        id: 1,
        name: "Nguyen Van A",
        email: "a@gmail.com",
        subject: "Support",
        message: "I need help with my order please check for me",
        createdAt: "2026-03-13",
      },
      {
        id: 2,
        name: "Tran Thi B",
        email: "b@gmail.com",
        subject: "Order",
        message: "Where is my order? It has not arrived yet",
        createdAt: "2026-03-12",
      },
    ];

    setInquiries(data);
  }, []);

  const handleDelete = (id: number) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Inquiries</h1>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((item) => (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{item.name}</td>

                <td className="p-4 text-gray-600">{item.email}</td>

                <td className="p-4">{item.subject}</td>

                <td className="p-4 max-w-xs truncate text-gray-500">
                  {item.message}
                </td>

                <td className="p-4 text-gray-500">{item.createdAt}</td>

                <td className="p-4 flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactinquiriesPage;
