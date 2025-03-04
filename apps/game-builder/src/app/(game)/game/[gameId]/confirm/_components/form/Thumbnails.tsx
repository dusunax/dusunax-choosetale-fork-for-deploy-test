import Image from "next/image";
import { useRef } from "react";
import { useWatch, type useForm } from "react-hook-form";
import { ImageIcon, TrashIcon } from "@radix-ui/react-icons";
import ThemedCarousel from "@themed/ThemedCarousel";
import ThemedIconButton from "@themed/ThemedIconButton";
import ThemedLabel from "@themed/ThemedLabel";
import ThemedCard from "@themed/ThemedCard";
import { type GameInfo } from "@/interface/customType";
import robotIcon from "@asset/icons/robot-solid.svg?url";
import useThumbnails from "@/hooks/useThumbnail";

export default function Thumbnails({
  ...useFormProps
}: ReturnType<typeof useForm<GameInfo>>) {
  const { getValues, control } = useFormProps;
  const {
    handleUpload,
    handleGenerate,
    handleDelete,
    handleChangeMainThumbnailImageId,
    currentThumbnailIdx,
    setCurrentThumbnailIdx,
    isGenerating,
    mainThumbnailImageId,
  } = useThumbnails(useFormProps);
  const gameId = Number(getValues("id"));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnails = useWatch({ control, name: "thumbnails" });
  const thumbnailExists = thumbnails.length > 0;

  const onUploadButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleUpload(gameId, files);
    }
  };

  return (
    <div className="flex flex-col gap-2 select-none">
      <ThemedLabel htmlFor="" labelText="썸네일" />
      <ThemedCard className="flex-col !py-4 gap-4">
        {thumbnailExists && (
          <ThemedCarousel
            thumbnails={thumbnails}
            setCurrentThumbnailId={setCurrentThumbnailIdx}
            currentThumbnailIdx={currentThumbnailIdx}
            mainThumbnailImageId={mainThumbnailImageId}
            handleChangeMainThumbnailImageId={handleChangeMainThumbnailImageId}
          />
        )}

        <div
          className={`flex justify-center gap-1 ${
            isGenerating
              ? "pointer-events-none cursor-default animate-pulse duration-1000"
              : ""
          }`}
        >
          {/* 썸네일 이미지 업로드 */}
          <ThemedIconButton onClick={onUploadButtonClick}>
            <ImageIcon className="h-5 w-5 m-1" />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={onFileChange}
            />
          </ThemedIconButton>

          {/* AI 이미지 생성 요청 */}
          <ThemedIconButton
            onClick={() => handleGenerate(gameId)}
            className={isGenerating ? "animate-pulse" : ""}
          >
            <Image
              className="h-5 w-5 m-1 -translate-y-[2px]"
              src={robotIcon}
              alt="generate choice"
            />
          </ThemedIconButton>

          {/* 썸네일 이미지 삭제 */}
          <ThemedIconButton
            disabled={!thumbnailExists}
            onClick={() => handleDelete(gameId, currentThumbnailIdx)}
          >
            <TrashIcon
              className="h-5 w-5 m-1"
              color={thumbnailExists ? undefined : "#aaaaaa"}
            />
          </ThemedIconButton>
        </div>
      </ThemedCard>
    </div>
  );
}
