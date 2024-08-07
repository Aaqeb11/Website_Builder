"use client";
import React, { useEffect } from "react";
import { ComponentsList } from "./ComponentsList";
import { EditorLayout } from "./EditorLayout";
import { NavBar } from "./NavBar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { FaRegImages } from "react-icons/fa";
import { IoText } from "react-icons/io5";
import { FiBox } from "react-icons/fi";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { ComponentTypes } from "@/types/types";
import { PropertyPanel } from "./PropertyPanel";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const BuilderLayout: React.FC = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      console.log(session?.user);
    }
  }, [sessionStatus, router]);
  const data = useMemo(() => {
    return [
      {
        title: "Image",
        icon: <FaRegImages className="text-3xl" />,
        type: "IMAGE" as ComponentTypes,
        id: uuidv4(),
      },
      {
        title: "Text",
        icon: <IoText className="text-3xl" />,
        type: "TEXT" as ComponentTypes,
        id: uuidv4(),
      },
      {
        title: "Box",
        icon: <FiBox className="text-3xl" />,
        type: "BOX" as ComponentTypes,
        id: uuidv4(),
      },
    ];
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col w-full h-screen">
        <div className="cols-span-12 h-[9vh] py-2">
          <NavBar />
        </div>
        <div className=" flex-grow grid grid-cols-12 bg-gray-200">
          <div className="bg-purple-500 h-full col-span-3">
            {data.map((item) => {
              return (
                <ComponentsList
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  type={item.type}
                />
              );
            })}
          </div>
          <div className="bg-white h-full col-span-7 p-2">
            <EditorLayout />
          </div>
          <div className="bg-gray-100 h-full col-span-2">
            <PropertyPanel />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
