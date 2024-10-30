import GameRestartButton from "@components/common/button/GameRestartButton";
import { removeEditorTags } from "@/utils/removeEditorTags";
import { getBuilderGameResult } from "@/actions/builder/getBuilderGameResult";
import TopNav from "../../../_components/TopNav";
import GamePlayChoosenPages from "./_components/GamePlayChoosenPages";

export interface GameResultParams {
  params: {
    gameId: string;
  };
}

export default async function Page({ params }: GameResultParams) {
  const { gameId } = params;

  const gameResult = await getBuilderGameResult(Number(gameId));

  if (!gameId || !gameResult.success) {
    return (
      <>
        <TopNav title="" hasBackButton />
        <section className="my-10 mx-6">
          <p className="text-xl mb-2">엔딩</p>
          <h1 className="text-2xl mb-6">결과 페이지</h1>
          <hr className="border-black my-4 pointer-none" />
          엔딩 결과가 없습니다
        </section>
      </>
    );
  }

  const choosenPages = gameResult.result.choosenPages;

  return (
    <section className="my-10">
      <p className="text-xl mb-2">엔딩</p>
      <h1 className="text-2xl mb-6">
        {removeEditorTags(gameResult.result.endingPage.abridgement)}
      </h1>

      <hr className="border-black my-4 pointer-none" />
      {choosenPages.map((page) => (
        <GamePlayChoosenPages key={page.id} page={page} />
      ))}
      <hr className="border-black my-4 pointer-none" />

      <div className="mt-10 mb-4 flex flex-col gap-3">
        <GameRestartButton gameId={Number(gameId)} />
      </div>
    </section>
  );
}
