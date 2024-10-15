"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import api from "@/lib/axios/axios";

export const deleteChoice = async (gameId: number, choiceId: number) => {
  try {
    await api.delete(`/game/${gameId}/choice/${choiceId}`);

    revalidateTag("game-all");
    return { success: true };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
