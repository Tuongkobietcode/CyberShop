import React from "react";
import sortOrdersIcon from "../../../assets/icons/sort.png";
import flowbiteOrdersIcon from "../../../assets/icons/flowbite_arrow-up-down-outline.png";
import moreOrdersIcon from "../../../assets/icons/DotsHorizontal.png";

const OrdersToolbar = () => {
  return (
    <>
      <div className="orders-toolbar">
        <div className="toolbar-bottom">
          <div className="tabs">
            <button className="tab active">All order (240)</button>
            <button className="tab">Completed</button>
            <button className="tab">Pending</button>
            <button className="tab">Canceled</button>
          </div>

          <div className="search-area">
            <input placeholder="Search order report" />

            <button className="icon-btn">
              <img src={sortOrdersIcon} alt="" />
            </button>
            <button className="icon-btn">
              <img src={flowbiteOrdersIcon} alt="" />
            </button>
            <button className="icon-btn">
              <img src={moreOrdersIcon} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .orders-toolbar{
          margin-bottom:20px;
        }

        .toolbar-top{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:16px;
        }

        .title{
          font-size:22px;
          font-weight:600;
        }

        .actions{
          display:flex;
          gap:10px;
        }

        .add-btn{
          background:#22c55e;
          color:white;
          border:none;
          padding:10px 16px;
          border-radius:8px;
          cursor:pointer;
        }

        .more-btn{
          background:#f3f4f6;
          border:none;
          padding:10px 16px;
          border-radius:8px;
          cursor:pointer;
        }

        .toolbar-bottom{
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .tabs{
          display:flex;
          gap:8px;
          background:#e7efe7;
          padding:6px;
          border-radius:10px;
        }

        .tab{
          border:none;
          padding:8px 14px;
          border-radius:8px;
          background:transparent;
          cursor:pointer;
        }

        .tab.active{
          background:white;
          font-weight:600;
        }

        .search-area{
          display:flex;
          gap:8px;
          align-items:center;
        }

        .search-area input{
          padding:8px 12px;
          border-radius:8px;
          border:1px solid #ddd;
          width:200px;
        }

        .icon-btn{
          width:36px;
          height:36px;
          border-radius:8px;
          border:1px solid #ddd;
          background:white;
          cursor:pointer;
        }
      `}</style>
    </>
  );
};

export default OrdersToolbar;
