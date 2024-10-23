import TypingHtml from "@/components/common/text/TypingHtml";
import useGamePlay from "@/hooks/useGamePlay";
import PlayChoices from "./PlayChoices";
import EndingPageButtonBox from "./EndingPageButtonBox";

export default function PlayPage({
  gameId,
  playId,
  pageId,
}: {
  gameId: number;
  playId: number;
  pageId: number;
}) {
  const { page, isChoiceSending, isEndingPage, isLoading, selectChoice } =
    useGamePlay({
      pageId,
      playId,
      gameId,
    });

  if (isLoading || (isLoading && !page)) {
    return null;
  }
  if (!page) {
    return null;
  }

  if (isEndingPage) {
    return (
      <>
        <div className="pt-6 pb-8 min-h-24">
          <h1 className="text-2xl font-bold text-center mb-8">이야기의 끝</h1>
          <TypingHtml htmlContent={page.description} speed="fast" />
        </div>

        <EndingPageButtonBox gameId={gameId} playId={playId} />
      </>
    );
  }

  return (
    <>
      <div className="pt-6 pb-8 min-h-24">
        <TypingHtml htmlContent={page.description} speed="fast" />
      </div>

      <PlayChoices
        choiceSending={isChoiceSending}
        choices={page.choices}
        selectChoice={selectChoice}
        pageLength={page.description.length}
      />
    </>
  );
}
