"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import WebViewNavBar from "./NavBar";

export default function MobileWrapper({
  children,
  hasNavBar = true,
}: PropsWithChildren<{ hasNavBar?: boolean }>) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");

    const checkTouchDevice = (e: MediaQueryListEvent) => {
      setIsTouchDevice(e.matches);
    };

    setIsTouchDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", checkTouchDevice);

    return () => mediaQuery.removeEventListener("change", checkTouchDevice);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-0.1px)] flex bg-slate-200">
      <UnSupported />
      <div className="mobile-layout max-w-5xl flex flex-col justify-between mx-auto bg-white">
        <div className="flex-1 overflow-y-auto">{children}</div>
        {hasNavBar && !isTouchDevice && <WebViewNavBar />}
      </div>
    </div>
  );
}

function UnSupported() {
  return (
    <div className="non-mobile-layout hidden w-full h-full flex justify-center items-center bg-grey">
      <p className="text-xl text-center leading-relaxed">
        가로 화면은 지원하지 않습니다🥹 <br />
        세로 화면으로 전환해 주세요.
      </p>
    </div>
  );
}
