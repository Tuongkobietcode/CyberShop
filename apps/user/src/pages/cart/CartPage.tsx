import React, { useState } from "react";
import { CartList } from "./components/CartList";
import { OrderSummary } from "./components/OrderSummary";

export const CartPage: React.FC = () => {
    return (
       <div className="flex justify-center items-center w-full h-screen">
           <div className="flex justify-center items-center w-[200vh]">
                <div className="w-[40%] mr-10">
                    <CartList />
                </div>
                <div className="w-[27.5%]">
                    <OrderSummary />
                </div>
           </div>
       </div>
    );
};