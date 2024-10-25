"use client";
import { type ReactNode } from "react";
import Link from "next/link";
import { type GameBuilderGame as GameBuilder } from "@/interface/customType";

interface GameBuilderCardProps {
  game: GameBuilder["games"][number];
  children: ReactNode;
}

export default function GameBuilderCard({
  game,
  children,
}: GameBuilderCardProps) {
  return (
    <Link href={`/game/${game.id}/builder`}>
      <div className="border border-grey-800 rounded-md overflow-hidden">
        <div className="flex flex-col gap-2 p-4 pb-5 font-semibold ">
          {children}
        </div>
      </div>
    </Link>
  );
}
