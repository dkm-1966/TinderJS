import { FC } from "react";
import Header from "../components/Header";
import Greeting from "../components/Greeting";

const Dashboard: FC = () => {
  return (
    <div className="h-full w-full flex flex-col bg-blue-100">
      <Header />
      <Greeting />
    </div>
  );
};

export default Dashboard;
