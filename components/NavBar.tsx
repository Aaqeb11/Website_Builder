import React from "react";
import { signOut } from "next-auth/react";

export const NavBar: React.FC = () => {
  return (
    <div className="text-4xl flex justify-center h-full items-center shadow-lg ">
      Website Builder
      <button
        onClick={() => {
          signOut();
        }}
        className="absolute right-[30px] text-xl border-2 border-black bg-black hover:bg-green-700 rounded-lg text-white px-4 "
      >
        Sign Out
      </button>
    </div>
  );
};
