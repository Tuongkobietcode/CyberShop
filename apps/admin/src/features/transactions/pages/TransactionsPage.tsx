import React, { useState } from "react";
import { TransactionKpiRow } from "../components/TransactionKpiRow";
import { PaymentMethodCard } from "../components/PaymentMethodCard";
import { TransactionToolbar } from "../components/TransactionsToolbar";
import { TransactionsTable } from "../components/TransactionsTable";

export const TransactionsPage: React.FC = () => {
    return (
        <div className="w-[79%] mx-auto bg-gray-100 pt-5 pl-5 pr-10 pb-15">
            <div className="flex justify-between mb-5">
                <div className="w-140">
                    <TransactionKpiRow />
                </div>
                <div className="w-140">
                    <PaymentMethodCard />
                </div>
            </div>
            <div className="rounded-xl shadow-md p-5 bg-white">
                <div className="mb-5">
                    <TransactionToolbar />
                </div>
                <div>
                    <TransactionsTable />
                </div>
            </div>
        </div>
    );
};