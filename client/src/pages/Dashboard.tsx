import { FC } from "react";
import Header from "../components/Header";

const Dashboard: FC = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-lime-50">
      <Header />
    </div>
  );
};

export default Dashboard;
