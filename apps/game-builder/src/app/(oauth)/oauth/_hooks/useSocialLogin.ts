"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { deleteCookie, getCookie } from "cookies-next";
import { type SessionWhenLoggin } from "@/lib/next-auth/authOptions";

export default function useSocialLogin() {
  const router = useRouter();
  const { data: session } = useSession();
  const sessionWhenLoggin = session as SessionWhenLoggin;
  const sidCookie = getCookie("connect.sid");

  const loginHandler = async () => {
    await signIn("google");
  };

  const logoutHandler = async () => {
    deleteCookie("connect.sid");
    await signOut();
  };

  useEffect(() => {
    if (sessionWhenLoggin) {
      const { loggin, isFirstLogin } = sessionWhenLoggin;
      if (loggin && !sidCookie) logoutHandler();
      if (loggin && sidCookie) {
        if (isFirstLogin) {
          router.push("/onboarding");
        } else {
          router.push("/game-list");
        }
      }
    }
  }, [sessionWhenLoggin, sidCookie, router]);

  return {
    sessionWhenLoggin,
    loginHandler,
    logoutHandler,
  };
}
