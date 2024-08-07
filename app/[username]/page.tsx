"use client";
import { BuilderLayout } from "@/components/BuilderLayout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/signin");
    }
  }, [sessionStatus, router]);
  return (
    <main>
      <BuilderLayout />
    </main>
  );
};

export default page;
