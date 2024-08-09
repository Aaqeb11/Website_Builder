"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import GoogleIcon from "../../public/google.png";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace(`/${session?.user?.name}`);
      console.log(session?.user);
    }
  }, [sessionStatus, router]);
  return (
    <div className="bg-[#FFDFD6] flex items-center justify-center min-h-screen shadow-lg">
      <div className="w-[30vw] h-[50vh] flex flex-col items-center justify-center rounded-xl bg-white gap-14 bg-[#B692C2]">
        <div className="text-2xl font-bold">Welcome to Website Builder</div>
        <div className="text-gray-500 text-[#694F8E]">Please sign in to continue.</div>
        <div>
          <button
            type="button"
            className="w-full flex items-center justify-center border-2 border-black bg-[#E3A5C7] hover:bg-[#694F8E]  transition-all duration-300 font-medium rounded-lg py-3 mb-4 px-4 "
            onClick={() => signIn("google")}
          >
            <Image src={GoogleIcon} alt="Google Icon" width={24} height={24} />
            <span className="ml-2 text-white tracking-tighter text-black hover:text-white">
              Sign in with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default page;
