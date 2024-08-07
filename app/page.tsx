"use client";
import { BuilderLayout } from "@/components/BuilderLayout";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.replace("/signin");
    }
    if (sessionStatus === "authenticated") {
      router.replace(`/${session?.user?.name}`);
    }
  }, [sessionStatus, router]);
  return (
    <main>
      <div>...Loading</div>
    </main>
  );
}
