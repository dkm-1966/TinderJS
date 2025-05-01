import React, { FC } from "react";
import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";

const Profile: FC = () => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col bg-blue-100 ">
      <Header />
      <ProfileForm />
    </div>
  );
};

export default Profile;
