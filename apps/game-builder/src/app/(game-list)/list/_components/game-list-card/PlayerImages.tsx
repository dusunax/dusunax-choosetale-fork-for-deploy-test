import { type SyntheticEvent, useState } from "react";
import Image from "next/image";
import { getPlaceholderImageOnError } from "@/utils/getPlaceholderImageOnError";

export default function PlayerImages({
  gamePlayerImageUrls,
}: {
  gamePlayerImageUrls: string[];
}) {
  const [hasError, setHasError] = useState(false);
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    if (hasError) return;
    setHasError(true);
    getPlaceholderImageOnError(e);
  };

  return (
    <div>
      <ul className="flex mr-2">
        {gamePlayerImageUrls.slice(0, 3).map((src) => (
          <li key={src} className="w-2">
            <div className="relative bg-gray-200 w-4 h-4 rounded-full overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="10px"
                style={{ objectFit: "cover" }}
                onError={handleImageError}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
