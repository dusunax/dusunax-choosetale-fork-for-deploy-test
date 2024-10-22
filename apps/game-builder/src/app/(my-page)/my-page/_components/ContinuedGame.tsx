import Link from "next/link";
import ChevronRightIcon from "@asset/icons/chevron-right.svg";
import { getContinuedGame } from "@/actions/my-page/getContinuedGame";
import TextOverlayDiv from "@/components/common/TextOverlayDiv";
import ContinuedGameCard from "../continued-game/_components/ContinuedGameCard";

export default async function ContinuedGame() {
  const continuedGame = await getContinuedGame({
    page: 1,
    limit: 8,
    genre: "ALL",
    sort: "LATEST",
  });

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between mx-5">
          <p className="text-title1 font-semibold">진행중인 게임</p>
          {!continuedGame?.length && (
            <Link href="/my-page/continued-game" className="flex items-center">
              <span className="text-body text-grey-300 mb-[2px]">전체보기</span>
              <ChevronRightIcon
                stroke="#a4a4a4"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              />
            </Link>
          )}
        </div>

        <div className="overflow-x-auto mx-5">
          <div className="flex gap-3">
            {continuedGame?.map((data) => (
              <ContinuedGameCard continuedGame={data} key={data.game.id} />
            ))}
            {!continuedGame?.length && (
              <div className="relative h-20 w-full">
                <TextOverlayDiv text="진행중인 게임이 없습니다." />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
