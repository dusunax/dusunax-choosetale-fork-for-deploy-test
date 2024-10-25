"use client";
import { type GameBuilderGame as GameBuilder } from "@/interface/customType";
import UsersProfilesIcon from "@asset/icons/users-profiles.svg";
import { formatDateString } from "@/utils/formatDatestring";

interface GameBuilderCardProps {
  game: GameBuilder["games"][number];
}

export default function GameBuilderHeader({ game }: GameBuilderCardProps) {
  return (
    <div className="flex justify-between">
      <p className="body text-green-500 flex items-center gap-1">
        <UsersProfilesIcon stroke="#22c55e" className="-mt-[1px]" />
        {game.count.reachEndingPlayerCount}명
      </p>
      <p className="body font-normal text-grey-300">
        {formatDateString(game.updatedAt)} 수정
      </p>
    </div>
  );
}
