"use client";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import Button from "@/components/common/button/Button";
import TextInput from "../../../../../components/common/input/TextInput";
import type { EditUserValues } from "../_types/editUserValue";

export default function EditNickname({
  control,
  errors,
}: {
  control: Control<EditUserValues>;
  errors: FieldErrors<EditUserValues>;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6">
      <Controller
        name="nickname"
        control={control}
        rules={{
          required: { message: "닉네임을 입력해주세요.", value: true },
          minLength: { message: "닉네임을 2자 이상 입력해주세요.", value: 2 },
          maxLength: {
            message: "닉네임을 10자 이하로 입력해주세요.",
            value: 10,
          },
        }}
        render={({ field }) => (
          <TextInput
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            value={field.value}
            onChange={field.onChange}
            error={errors.nickname?.message ?? ""}
            required
            minLength={2}
            maxCount={10}
          />
        )}
      />

      <div className="w-full h-[52px] flex">
        <Button buttonText="저장" type="submit" />
      </div>
    </div>
  );
}
