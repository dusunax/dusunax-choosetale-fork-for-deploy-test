"use client";
import { useForm } from "react-hook-form";
import type { User } from "@/interface/customType";
import { updateUser } from "@/actions/user/updateUser";
import type { EditUserValues } from "../_types/editUserValue";
import EditNickname from "./EditNickname";
import EditProfileImage from "./EditProfileImage";

export interface EditUserProps {
  user: User;
}

export default function EditUser({ user }: EditUserProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<EditUserValues>({
    defaultValues: {
      profileImage: user.profileImage?.url,
      newImage: null,
      nickname: user.nickname,
    },
  });

  const onSubmit = (data: EditUserValues) => {
    const formData = new FormData();
    if (data.newImage) formData.append("image", data.newImage);
    formData.append("nickname", data.nickname);

    updateUser(formData);
  };

  const onImageChange = (newImage: File) => {
    setValue("newImage", newImage);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
      <EditProfileImage
        user={user}
        onImageChange={onImageChange}
        errors={errors}
        setError={setError}
        clearErrors={clearErrors}
      />
      <EditNickname control={control} errors={errors} />
    </form>
  );
}
