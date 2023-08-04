import Image from "next/image";
import React, { useState } from "react";
import menu from "../data/menu";

const SideNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-[200px] bg-white h-screen sticky top-0 z-10 shadow-blue-300 shadow-md p-5">
      <div className="flx justify-center">
        <Image src="/logo.png" alt="logo" width={150} height={60} />
      </div>
      <button className="flex gap-2 items-center bg-blue-500 py-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-5 w-full text-[13px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Add New File
      </button>
      <button className="flex gap-2 items-center bg-sky-400 py-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-1 w-full text-[13px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        New Folder
      </button>

      <div>
        {menu.list.map((item, index) => (
          <h2 
          onClick={()=> setActiveIndex(index)}
          className={`flex gap-2 items-center p-2 mt-3 text-gray-500 hover:bg-blue-400 hover:text-white rounded-md cursor-pointer transition-all ${activeIndex == index ? 'bg-blue-500 text-blue-50' : null}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d={item.logo}
              />
            </svg>
            {item.name}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
