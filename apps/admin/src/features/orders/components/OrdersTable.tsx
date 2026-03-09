import React from "react";

const orders = [
  {
    id: "#ORD0001",
    product: "Wireless Bluetooth Headphones",
    date: "01-01-2025",
    price: "49.99",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "#ORD0002",
    product: "Men's T-Shirt",
    date: "01-01-2025",
    price: "14.99",
    payment: "Unpaid",
    status: "Pending",
  },
  {
    id: "#ORD0003",
    product: "Coffee Maker",
    date: "01-01-2025",
    price: "79.99",
    payment: "Unpaid",
    status: "Canceled",
  },
];

const OrdersTable = () => {
  return (
    <>
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th></th>
              <th>No.</th>
              <th>Order Id</th>
              <th>Product</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>

                <td>{index + 1}</td>

                <td>{order.id}</td>

                <td>
                  <div className="product">
                    <div className="img"></div>
                    {order.product}
                  </div>
                </td>

                <td>{order.date}</td>

                <td>${order.price}</td>

                <td>
                  <div
                    className={`payment ${
                      order.payment === "Paid" ? "paid" : "unpaid"
                    }`}
                  >
                    <span className="dot"></span>
                    {order.payment}
                  </div>
                </td>

                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button>Previous</button>

          <div className="pages">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <span>...</span>
            <button>24</button>
          </div>

          <button>Next</button>
        </div>
      </div>

      <style>{`
        .table-wrapper{
          background:white;
          border-radius:10px;
        }

        .orders-table{
          width:100%;
          border-collapse:collapse;
        }

        thead{
          background:#dfeadf;
        }

        th{
          text-align:left;
          padding:14px;
          font-weight:600;
        }

        td{
          padding:14px;
          border-bottom:1px solid #eee;
        }

        tr:hover{
          background:#f9fafb;
        }

        .product{
          display:flex;
          align-items:center;
          gap:10px;
        }

        .img{
          width:36px;
          height:36px;
          border-radius:6px;
          background:#f3f4f6;
        }

        .payment{
          display:flex;
          align-items:center;
          gap:6px;
        }

        .dot{
          width:8px;
          height:8px;
          border-radius:50%;
        }

        .paid .dot{
          background:#22c55e;
        }

        .unpaid .dot{
          background:#ef4444;
        }

        .status{
          font-weight:500;
        }

        .status.delivered{
          color:#22c55e;
        }

        .status.pending{
          color:#f59e0b;
        }

        .status.canceled{
          color:#ef4444;
        }

        .pagination{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:16px;
        }

        .pages{
          display:flex;
          gap:6px;
        }

        .pages button{
          border:1px solid #ddd;
          background:white;
          padding:6px 10px;
          border-radius:6px;
          cursor:pointer;
        }

        .pages .active{
          background:#22c55e;
          color:white;
          border:none;
        }

        .pagination button{
          padding:8px 14px;
          border-radius:8px;
          border:1px solid #ddd;
          background:white;
          cursor:pointer;
        }
      `}</style>
    </>
  );
};

export default OrdersTable;
