"use client";
import { useState } from "react";
import Image from "next/image";
import type {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";
import type { User } from "@/interface/customType";
import profilePlaceholder from "@asset/images/profile-placeholder.svg?url";
import ChangeImageButtonIcon from "@asset/icons/change-image-button.svg";
import type { EditUserValues } from "../_types/editUserValue";

export default function EditProfileImage({
  user,
  onImageChange,
  errors,
  setError,
  clearErrors,
}: {
  user: User;
  onImageChange: (newImage: File) => void;
  errors: FieldErrors<EditUserValues>;
  setError: UseFormSetError<EditUserValues>;
  clearErrors: UseFormClearErrors<EditUserValues>;
}) {
  const [imageUrl, setImageUrl] = useState(
    user.profileImage.url ?? profilePlaceholder
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file === undefined) return;
    const newImageUrl = URL.createObjectURL(file);

    setIsLoading(true);
    clearErrors("newImage");

    try {
      onImageChange(file);
      setImageUrl(newImageUrl);
    } catch (err) {
      setError("newImage", { message: "이미지 파일 변경 실패" });
    } finally {
      setIsLoading(false);
    }
  };

  const inputId = "profile-image-input";

  const handleButtonClick = () => {
    document.getElementById(inputId)?.click();
  };

  return (
    <div className="h-60 flex flex-col items-center justify-center relative">
      <button
        onClick={handleButtonClick}
        className="cursor-pointer bg-transparent border-none p-0"
        aria-label="Change profile image"
        disabled={isLoading}
        type="button"
      >
        <div className="relative">
          <div
            className={`relative w-20 h-20 rounded-[1.125rem] overflow-hidden bg-grey-800 ${
              isLoading ? "animate-pulse" : ""
            } ${errors.newImage ? "border-2 border-red-500" : ""}`}
          >
            <Image
              src={imageUrl}
              alt="profile"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="5rem"
            />
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1 translate-y-1">
            <ChangeImageButtonIcon />
          </div>
        </div>
      </button>

      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
