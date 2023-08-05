import React from "react";
import Userinfo from "./Userinfo";
import StorageInfo from "./StorageInfo";
import { useSession } from "next-auth/react";

const Storage = () => {
  const { data: session } = useSession();
  return (
    session && (
      <div className="bg-white p-5
      order-first md:order-last">
        <Userinfo />
        <StorageInfo />
      </div>
    )
  );
};

export default Storage;
