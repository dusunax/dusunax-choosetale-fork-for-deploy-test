"use server";
import { revalidateTag } from "next/cache";
import type { HttpError } from "@choosetale/nestia-type";
import type { UpdateChoiceResDto } from "@choosetale/nestia-type/lib/structures/UpdateChoiceResDto";
import type { NewChoice } from "@/interface/customType";
import api from "@/app/api/axios/axios";
import type { ApiResponse, SuccessResponse } from "../action";

interface ApiSuccessResponse extends SuccessResponse {
  choice: UpdateChoiceResDto;
}

export const updateChoice = async (
  gameId: number,
  choiceId: number,
  choiceData: NewChoice
): Promise<ApiResponse<ApiSuccessResponse>> => {
  try {
    const response = await api.put(
      `/game/${gameId}/choice/${choiceId}`,
      choiceData
    );

    revalidateTag("game-all");
    const choice = response.data as UpdateChoiceResDto;
    return { success: true, choice };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
