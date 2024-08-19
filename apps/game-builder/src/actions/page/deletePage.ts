"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";

export const deletePage = async (gameId: number, pageId: number) => {
  try {
    await fetch(`${API_URL}/game/${gameId}/page/${pageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};