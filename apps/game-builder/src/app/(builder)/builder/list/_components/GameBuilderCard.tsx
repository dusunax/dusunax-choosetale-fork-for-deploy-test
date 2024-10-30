"use client";
import { type ReactNode } from "react";

interface GameBuilderCardProps {
  children: ReactNode;
}

export default function GameBuilderCard({ children }: GameBuilderCardProps) {
  return (
    <div className="border border-grey-800 rounded-md overflow-hidden">
      <div className="flex flex-col gap-2 p-4 pb-5 font-semibold ">
        {children}
      </div>
    </div>
  );
}
