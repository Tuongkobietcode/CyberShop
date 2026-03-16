import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const ContactinquiriesPage = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/contact");
      const data = await res.json();
      setInquiries(data.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();

    const interval = setInterval(() => {
      fetchInquiries();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete inquiry?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`http://localhost:4000/api/contact/${id}`, {
        method: "DELETE",
      });

      setInquiries((prev) => prev.filter((item) => item._id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Inquiry has been removed.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete inquiry",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Contact Inquiries
        </h1>

        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {inquiries.length} messages
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-500 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Subject</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="pr-10 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
              >
                {/* USER */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center font-semibold shadow">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.email}</p>
                  </div>
                </td>

                {/* SUBJECT */}
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                    {item.subject}
                  </span>
                </td>

                {/* MESSAGE */}
                <td className="px-6 py-4 max-w-xs">
                  <p className="truncate text-gray-600">{item.message}</p>
                </td>

                {/* DATE */}
                <td className="px-6 py-4 text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                </td>

                {/* ACTION */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}

            {inquiries.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No inquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactinquiriesPage;
