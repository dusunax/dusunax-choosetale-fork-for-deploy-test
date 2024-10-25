"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteCookie, getCookie } from "cookies-next";

export default function AuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const sidCookie = getCookie("connect.sid");

  useEffect(() => {
    const loggined = status === "authenticated" && sidCookie !== undefined;

    if (loggined && pathname === "/") {
      router.push("/game-list");
    } else if (status !== "loading" && !loggined && pathname !== "/oauth") {
      deleteCookie("connect.sid");
      router.push("/oauth");
    }
  }, [status, sidCookie, pathname, router]);

  return null;
}
