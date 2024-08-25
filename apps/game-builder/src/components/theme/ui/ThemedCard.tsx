"use client";
import type { ReactNode } from "react";
import { Card } from "@/components/repo-ui/components/ui/Card";
import { useThemeStore } from "@/store/useTheme";

interface ThemedCardProps {
  children: ReactNode;
  className?: string;
  isChoice?: boolean;
}

export default function ThemedCard({
  children,
  className,
  isChoice,
}: ThemedCardProps) {
  const { theme } = useThemeStore((state) => state);
  let themeClass;

  switch (theme) {
    case "old-game":
      themeClass = `${isChoice ? "nes-balloon from-right" : "nes-container"} !flex !p-0`;
      break;
    case "windows-98":
      themeClass = "rounded-none bg-[#dfdfdf]";
      break;
    default:
  }

  return <Card className={`flex ${themeClass} ${className}`}>{children}</Card>;
}
