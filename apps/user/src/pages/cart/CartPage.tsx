import React, { useState } from "react";
import { CartList } from "./components/CartList";
import { OrderSummary } from "./components/OrderSummary";

const CartPage: React.FC = () => {
    return (
       <div className="flex justify-center items-center w-full h-screen">
           <div className="flex justify-center items-center w-[200vh]">
                 <div className="w-[40%] mr-10">
                    <CartList />
                </div>
                <div className="w-[25%]">
                    <OrderSummary />
                </div>
           </div>
       </div>
    );
};

export default CartPage;