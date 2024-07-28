"use client";
import useClientChoices from "@/hooks/useClientChoices";
import type useGameData from "@/hooks/useGameData";
import ChoiceCard from "@/components/card/choice/ChoiceCard";
import PageCard from "@components/card/page/PageCard";
import type { ChoiceType } from "@/interface/customType";

interface GameBuilderContentProps extends ReturnType<typeof useGameData> {
  gameId: number;
}

export default function GameBuilderContent({
  gameId,
  ...useGameDataProps
}: GameBuilderContentProps) {
  const { gamePageList, deleteChoice, updatePage, updateChoices, deletePage } =
    useGameDataProps;
  const {
    clientChoicesMap,
    addClientChoice,
    removeClientChoice,
    addAiChoice,
    updateClientChoice,
  } = useClientChoices({
    gamePageList,
  });

  const handleAddChoice = (pageId: number) => {
    addClientChoice(pageId);
  };
  const handleAddChoiceByAI = (pageId: number) => {
    addAiChoice({ gameId, pageId });
  };
  const handleFixChoice = (pageId: number, choice: ChoiceType) => {
    if (choice.source === "server") updateChoices(pageId, choice);
    if (choice.source === "client") updateClientChoice(pageId, choice);
  };
  const handleDeleteChoice = (pageId: number, choice: ChoiceType) => {
    if (choice.source === "server") deleteChoice(pageId, choice.id);
    if (choice.source === "client") removeClientChoice(pageId, choice.id);
  };
  const handleDeletePage = (pageId: number) => {
    if (confirm("페이지를 삭제하면 페이지의 선택지가 함께 삭제됩니다."))
      deletePage(pageId);
  };

  const availablePages = gamePageList.map((page) => ({
    pageId: page.id,
    title: page.abridgement,
  }));
  const getToPage = (toPageId: number) =>
    availablePages.find((p) => p.pageId === toPageId);

  return (
    <div className="flex-1 flex flex-col gap-4">
      {gamePageList.map((page) => {
        const choices = page.choices as ChoiceType[];
        const clientChoice = clientChoicesMap.get(page.id) as
          | ChoiceType[]
          | undefined;

        return (
          <div key={`page${page.id}`} className="flex flex-col gap-4">
            <PageCard
              page={page}
              choicesLength={page.choices.length + (clientChoice?.length ?? 0)}
              addChoice={() => handleAddChoice(page.id)}
              addAIChoice={() => handleAddChoiceByAI(page.id)}
              updatePage={updatePage}
              deletePage={() => handleDeletePage(page.id)}
            />
            {[...choices, ...(clientChoice ? clientChoice : [])].map(
              (choice) => {
                return (
                  <ChoiceCard
                    key={`${choice.source}-page${page.id}-choice${choice.id}`}
                    choice={choice}
                    defaultFixed={choice.source === "server"}
                    fixChoice={(partialChoice) =>
                      handleFixChoice(page.id, partialChoice)
                    }
                    removeChoice={() => handleDeleteChoice(page.id, choice)}
                    availablePages={availablePages}
                    linkedPage={getToPage(choice.toPageId)}
                  />
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
}
