import { FC } from "react";
import AuthForm from "../components/AuthForm";

const Auth: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100 gap-4">
      <h1 className="text-2xl font-bold text-center">Welcome to TinderJS</h1>
      <AuthForm />
    </div>
  );
};

export default Auth;
