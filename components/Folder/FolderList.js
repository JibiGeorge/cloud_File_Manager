import React, { useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";

const FolderList = ({ folderList }) => {
  const router = useRouter();

  const onFolderClick = (item) => {
    router.push({
      pathname: "/folder/" + item.id,
      query: {
        name: item.name,
        id: item.id
      }
    });
  };
  return (
    <div className="p-5 mt-5 bg-white rounded-lg">
      <h2 className="text-[17px] font-bold items-center text-black">
        Recent Folders
        <span className="float-right text-blue-400 font-normal text-[13px]">
          View All
        </span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-2">
        {folderList.map((item, index) => (
          <div
            onClick={() => {
              onFolderClick(item);
            }}
          >
            <FolderItem folder={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
