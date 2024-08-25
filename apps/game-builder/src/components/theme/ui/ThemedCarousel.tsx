import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, StarFilledIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/repo-ui/components/ui/Carousel";
import { AspectRatio } from "@/components/repo-ui/components/ui/AspectRatio";
import { useThemeStore } from "@/store/useTheme";
import { type Thumbnail } from "@/interface/customType";

interface ThemedCarouselProps {
  thumbnails: Thumbnail[];
  setCurrentThumbnailId: Dispatch<SetStateAction<number>>;
  currentThumbnailIdx: number;
  mainThumbnailImageId: number;
  handleChangeMainThumbnailImageId: (id: number) => void;
}

export default function ThemedCarousel({
  thumbnails,
  setCurrentThumbnailId,
  currentThumbnailIdx,
  mainThumbnailImageId,
  handleChangeMainThumbnailImageId,
}: ThemedCarouselProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = "nes-btn !m-0 !p-1";
      break;
    case "windows-98":
      themeClass = "rounded-none min-w-10 !bg-[#c0c0c0] z-10";
      break;
    default:
  }

  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (api) {
      const updateCurrentThumbnailId = () =>
        setCurrentThumbnailId(api.selectedScrollSnap());

      updateCurrentThumbnailId();

      api.on("select", updateCurrentThumbnailId);
      return () => {
        api.off("select", updateCurrentThumbnailId);
      };
    }
  });

  useEffect(() => {
    if (api && currentThumbnailIdx !== api.selectedScrollSnap())
      api.scrollTo(currentThumbnailIdx);
  }, [api, currentThumbnailIdx]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className="mx-10">
        {thumbnails.map((thumbnail, idx) => (
          <CarouselItemWithOnError
            thumbnail={thumbnail}
            idx={idx}
            key={`thumbnail-${thumbnail.id}`}
            isMainThumbnailImageId={mainThumbnailImageId === thumbnail.id}
            onChangeMainThumbnailImageId={handleChangeMainThumbnailImageId}
          />
        ))}
      </CarouselContent>
      <CarouselPrevious
        type="button"
        className={`translate-x-6 ${themeClass} !absolute`}
        style={{
          boxShadow:
            theme === "windows-98"
              ? "inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf"
              : "",
        }}
      />
      <CarouselNext
        type="button"
        className={`-translate-x-6 ${themeClass} !absolute`}
        style={{
          boxShadow:
            theme === "windows-98"
              ? "inset -1px -1px #0a0a0a,inset 1px 1px #fff,inset -2px -2px grey,inset 2px 2px #dfdfdf"
              : "",
        }}
      />
    </Carousel>
  );
}

function CarouselItemWithOnError({
  thumbnail,
  idx,
  isMainThumbnailImageId,
  onChangeMainThumbnailImageId,
}: {
  thumbnail: Thumbnail;
  idx: number;
  isMainThumbnailImageId: boolean;
  onChangeMainThumbnailImageId: (id: number) => void;
}) {
  const [src, setSrc] = useState(thumbnail.url);
  const [isError, setIsError] = useState(false);
  const placeholderSrc =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";

  const handleError = () => {
    setSrc(placeholderSrc);
    setIsError(true);
  };

  return (
    <CarouselItem className="px-2">
      <AspectRatio ratio={9 / 9}>
        <div className="absolute w-full h-full">
          <Image
            src={src}
            alt={`thumbnail image ${thumbnail.id}`}
            className="rounded-md object-cover border select-none"
            onError={handleError}
            fill
            priority={idx <= 1}
            sizes="(max-width: 600px) 80vw, 400px"
          />
        </div>
        {isError && (
          <div className="absolute w-full h-full rounded-md border border-red-500 flex justify-center items-center">
            <ImageIcon className="w-10 h-10" color="#aaaaaa" />
            <div className="w-[42px] border-b-2 absolute border-[#aaaaaa] -rotate-45" />
          </div>
        )}
        <div className="absolute right-0 p-3">
          <button
            onClick={() => onChangeMainThumbnailImageId(thumbnail.id)}
            type="button"
            className={`p-1 text-xs rounded-xl shadow-md ${
              isMainThumbnailImageId ? "!bg-green-400" : "!bg-white"
            }`}
          >
            <StarFilledIcon
              className="w-4 h-4"
              color={`${isMainThumbnailImageId ? "#ffffff" : "#aaaaaa"}`}
            />
          </button>
        </div>
      </AspectRatio>
    </CarouselItem>
  );
}
