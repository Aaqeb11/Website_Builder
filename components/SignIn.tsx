import React from "react";
import Image from "next/image";
import GoogleIcon from "/google.png";
import { signIn, signOut, useSession } from "next-auth/react";

const SignIn = () => {
  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center justify-center border-2 border-[#00D93D] hover:bg-black  transition-all duration-300 font-medium rounded-lg py-3 mb-4"
        onClick={() => signIn("google")}
      >
        <Image src={GoogleIcon} alt="Google Icon" width={24} height={24} />
        <span className="ml-2 text-white tracking-tighter">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};
export default SignIn;
