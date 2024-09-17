import { motion } from "framer-motion";
import GameRestartButton from "@/components/button/GameRestartButton";
import GameResultButton from "@/components/button/game-play/GameResultButton";

interface EndingPageButtonBoxProps {
  playId: number;
  gameId: number;
}

export default function EndingPageButtonBox({
  playId,
  gameId,
}: EndingPageButtonBoxProps) {
  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GameResultButton playId={playId} />
      <GameRestartButton gameId={gameId} />
    </motion.div>
  );
}