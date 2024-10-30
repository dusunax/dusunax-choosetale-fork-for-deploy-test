import { type EndedGameGroupGame } from "@/interface/customType";
import GroupGameEndedGameCard from "./GroupGameEndedGameCard";

interface EndedGameListProps {
  endedGame: EndedGameGroupGame[];
}

export default function GroupGameEndedGameList({
  endedGame,
}: EndedGameListProps) {
  return (
    <div className="w-full grow-0 flex flex-col gap-4">
      {endedGame.map((game, index) => (
        <GroupGameEndedGameCard
          endedGame={game}
          // eslint-disable-next-line react/no-array-index-key -- Using index as key because content with tab needs unique identifier more than gameId
          key={`${game.game.id}-${index}`}
        />
      ))}
    </div>
  );
}
