import React, { useState } from "react";
import { CartList } from "./components/CartList";
import { OrderSummary } from "./components/OrderSummary";

const CartPage: React.FC = () => {
    return (
       <div className="flex justify-center">
         <div className="w-[40%]">
            <CartList />
        </div>
        <div className="w-[25%]">
            <OrderSummary />
        </div>
       </div>
    );
};

export default CartPage;