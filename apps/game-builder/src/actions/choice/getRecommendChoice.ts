"use server";
import type { HttpError } from "@choosetale/nestia-type";
import type { ApiResponse, SuccessResponse } from "../action";

// --게임 정보 불러오기--
interface GetRecommendChoiceSuccessResponse extends SuccessResponse {
  choices: {
    title: string;
    description: string;
  }[];
}

export const getRecommendChoice = async (
  gameId: number,
  pageId: number
): Promise<ApiResponse<GetRecommendChoiceSuccessResponse>> => {
  try {
    const response = await fetch(
      `/game/${gameId}/page/${pageId}/recommend-choices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      }
    );

    const choices = await response.json();
    return { success: true, choices };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
