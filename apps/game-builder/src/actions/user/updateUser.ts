"use server";
import api from "@/lib/axios/axios";

export const updateUser = (formdata: FormData) => {
  return api.patch(`/user`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
