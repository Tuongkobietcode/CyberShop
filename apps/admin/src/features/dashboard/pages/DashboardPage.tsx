import AddNewProductWidget from "../components/AddNewProductWidget";
import BestSellingProduct from "../components/BestSellingProduct";
import TopProduct from "../components/TopProduct";
import DashboardKpiRow from "../components/DashboardKpiRow";
import WeeklyReportChart from "../components/WeeklyReportChart";
import UsersLast30Min from "../components/UsersLast30Min";
import TransactionTable from "../components/TransactionTable";

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <DashboardKpiRow></DashboardKpiRow>
      <div className="flex px-5 gap-5">
        <WeeklyReportChart></WeeklyReportChart>
        <UsersLast30Min></UsersLast30Min>
      </div>
      <div className="flex flex-row px-5 pt-5 gap-5">
        <TransactionTable></TransactionTable>
        <TopProduct></TopProduct>
      </div>
      <div className="flex flex-row p-5 gap-5">
        <BestSellingProduct></BestSellingProduct>
        <AddNewProductWidget></AddNewProductWidget>
      </div>
    </div>
  );
};

export default DashboardPage;
