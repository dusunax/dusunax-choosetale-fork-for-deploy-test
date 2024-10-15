"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/lib/axios/axios";

export const deletePage = async (gameId: number, pageId: number) => {
  try {
    await api.delete(`/game/${gameId}/page/${pageId}`);

    revalidateTag("game-all");
    return { success: true };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
