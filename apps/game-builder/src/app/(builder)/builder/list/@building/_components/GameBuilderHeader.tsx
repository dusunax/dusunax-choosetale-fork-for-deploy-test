"use client";
import { type GameBuilderGame as GameBuilder } from "@/interface/customType";
import { formatDateString } from "@/utils/formatDatestring";

interface GameBuilderCardProps {
  game: GameBuilder["games"][number];
}

export default function GameBuilderHeader({ game }: GameBuilderCardProps) {
  return (
    <div className="body text-grey-300 flex justify-between">
      <p>제작중</p>
      <p className="body font-normal text-grey-300">
        {formatDateString(game.updatedAt)} 수정
      </p>
    </div>
  );
}
