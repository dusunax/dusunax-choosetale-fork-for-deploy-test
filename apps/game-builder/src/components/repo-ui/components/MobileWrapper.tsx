"use client";
import { PropsWithChildren } from "react";
import NavBar from "./NavBar";

export default function MobileWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-[calc(100vh-1px)] bg-slate-200">
      <div className="max-w-xl h-full flex flex-col justify-between mx-auto">
        <div className="flex-1">{children}</div>
        <NavBar />
        <div className="w-4 h-4 bg-red-500"></div>
      </div>
    </div>
  );
}
