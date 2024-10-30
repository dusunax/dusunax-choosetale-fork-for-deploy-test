import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { type GameList as GameListType } from "@/interface/customType";
import { type GameListSearchParams } from "@/utils/formatGameListSearchParams";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

export default function useGameList({
  gameList,
  formattedSearchParams: currentSearchParams,
}: {
  gameList: GameListType;
  formattedSearchParams: GameListSearchParams;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevParams = useRef(currentSearchParams);

  const [currentGameList, setCurrentGameList] = useState<GameListType>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const updateItems = (newGameList: GameListType) => {
    setCurrentGameList((prev) => [...prev, ...newGameList]);
    setHasMore(newGameList.length > 0);
    setIsLoading(false);
  };

  const resetItems = useCallback(() => {
    setCurrentGameList([]);
    setHasMore(true);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", "1");
    router.push(`/game-list?${newSearchParams.toString()}`);
  }, [searchParams, router]);

  useEffect(() => {
    if (String(currentSearchParams.page) !== String(prevParams.current.page)) {
      updateItems(gameList);
    }

    if (
      currentSearchParams.genre !== prevParams.current.genre ||
      currentSearchParams.order !== prevParams.current.order
    ) {
      resetItems();
    }

    if (Number(currentSearchParams.page) === 1) {
      setCurrentGameList(gameList);
    }
    prevParams.current = currentSearchParams;
  }, [currentSearchParams, gameList, resetItems]);

  const nextPage = () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (currentSearchParams.page) {
      newSearchParams.set(
        "page",
        (Number(currentSearchParams.page) + 1).toString()
      );
      router.push(`/game-list?${newSearchParams.toString()}`);
    }
  };

  const observerRef = useInfiniteScroll({
    callback: () => {
      if (isLoading || !hasMore || !currentGameList.length) return;
      nextPage();
    },
    isLoading,
    hasMore,
  });

  return { currentGameList, nextPage, observerRef, isLoading };
}
