"use client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useChoices from "@/hooks/useChoices";
import type useGameData from "@/hooks/useGameData";
import type { ChoiceType, NewChoice, PageType } from "@/interface/customType";
import ChoiceCard from "@/app/(game)/game/[gameId]/builder/_components/choice/ChoiceCard";
import GameSubmitButton from "@/components/common/button/GameSubmitButton";
import PageCard from "./page/PageCard";
import UnLinkedPages from "./UnLinkedPages";
import StoryLine from "./StoryLine";
import NewPage from "./new-page/NewPage";

interface GameBuilderContentProps extends ReturnType<typeof useGameData> {
  gameId: number;
}

export default function GameBuilderContent({
  gameId,
  ...useGameDataProps
}: GameBuilderContentProps) {
  const {
    gamePageList,
    addPageData,
    updatePageData,
    addChoiceData,
    updateChoicesData,
    deleteChoiceData,
    deletePageData,
    reloadGameData,
  } = useGameDataProps;
  const {
    unFixedChoicesMap,
    addUnFixedChoice,
    removeUnFixedChoice,
    genAiChoice,
    isGenerating,
  } = useChoices({
    gamePageList,
  });

  const handleNewPage = (newPageData: {
    content: string;
    isEnding: boolean;
  }) => {
    addPageData({ depth: -1, pageData: newPageData });
  };
  const handleUpdatePage = async (pageId: number, updatedPage: PageType) => {
    await updatePageData(pageId, updatedPage);
  };
  const handleAddChoiceByUser = (pageId: number) => {
    addUnFixedChoice(pageId);
  };
  const handleGenChoiceByAI = (pageId: number) => {
    genAiChoice({ gameId, pageId });
  };
  const handleFixChoice = async (pageId: number, choice: ChoiceType) => {
    const payload: NewChoice = {
      parentPageId: choice.fromPageId,
      childPageId: choice.toPageId ?? -1,
      title: choice.title,
      description: choice.description,
    };
    if (choice.source === "client") {
      const success = await addChoiceData(pageId, payload);
      if (success) removeUnFixedChoice(pageId, choice.id);
    }
    if (choice.source === "server") {
      updateChoicesData(gameId, choice.id, payload);
    }
    reloadGameData();
  };
  const handleDeleteChoice = (pageId: number, choice: ChoiceType) => {
    if (choice.source === "client") removeUnFixedChoice(pageId, choice.id);
    if (choice.source === "server") deleteChoiceData(pageId, choice.id);
  };
  const handleDeletePage = (pageId: number) => {
    if (confirm("페이지를 삭제합니다.")) deletePageData(pageId);
  };

  const availablePages = gamePageList.map((page) => ({
    pageId: page.id,
    content: page.abridgement ? page.abridgement : page.description,
    isEnding: page.isEnding,
  }));
  const getLinkedPage = (toPageId: number) =>
    availablePages.find((p) => p.pageId === toPageId);

  return (
    <div className="flex-1 flex flex-col relative px-6">
      <div className="pl-6 flex flex-col">
        <NewPage handleNewPage={handleNewPage} className="justify-end">
          <button
            className="relative z-1 inline-block flex items-center gap-1 px-2 py-[3px] self-end text-xs border border-[#22c55e] text-white !bg-[#22c55e] rounded-md"
            type="button"
          >
            <PlusCircledIcon className="h-4 w-4" />
            <span className="mr-1">새 페이지</span>
          </button>
        </NewPage>

        <UnLinkedPages
          gamePageList={gamePageList}
          updatePage={handleUpdatePage}
          handleDeletePage={handleDeletePage}
        />
      </div>

      <div className="flex flex-1">
        <div>
          <StoryLine />
          <GameSubmitButton gameId={gameId} />
        </div>

        <div className="flex-1 pb-28">
          {gamePageList
            .sort((a, b) => a.depth - b.depth)
            .map((page) => {
              if (page.depth < 0) return;
              const choices = page.choices as ChoiceType[];
              const unFixedChoice = unFixedChoicesMap.get(page.id) as
                | ChoiceType[]
                | undefined;
              const combinedChoices = [...choices, ...(unFixedChoice ?? [])];

              return (
                <div key={`page${page.id}`} className="flex flex-col">
                  <PageCard
                    page={page}
                    choicesLength={
                      page.choices.length + (unFixedChoice?.length ?? 0)
                    }
                    addChoice={() => handleAddChoiceByUser(page.id)}
                    genAIChoice={() => handleGenChoiceByAI(page.id)}
                    updatePage={handleUpdatePage}
                    deletePage={() => handleDeletePage(page.id)}
                    isGenerating={isGenerating}
                  />
                  {combinedChoices
                    .sort((a, b) => {
                      if (a.id >= 0 && b.id >= 0) return a.id - b.id;
                      if (a.id >= 0 && b.id < 0) return -1;
                      if (a.id < 0 && b.id >= 0) return 1;
                      return a.id - b.id;
                    })
                    .map((choice) => {
                      return (
                        <ChoiceCard
                          key={`${choice.source}-page${page.id}-choice${choice.id}`}
                          choice={choice}
                          defaultFixed={choice.source === "server"}
                          handleFixChoice={(partialChoice) =>
                            handleFixChoice(page.id, partialChoice)
                          }
                          removeChoice={() =>
                            handleDeleteChoice(page.id, choice)
                          }
                          availablePages={availablePages}
                          linkedPage={getLinkedPage(choice.toPageId ?? -1)}
                          addPageData={addPageData}
                        />
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
