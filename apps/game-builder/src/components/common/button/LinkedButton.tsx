"use client";
import Link from "next/link";
import type { ButtonProps } from "@/components/repo-ui/components/ui/Button";
import ThemedButton from "@/components/theme/ui/ThemedButton";

interface LinkedButtonProps extends ButtonProps {
  buttonText: string;
  to: string;
}

export default function LinkedButton({
  buttonText,
  to,
  ...props
}: LinkedButtonProps) {
  return (
    <Link href={to}>
      <ThemedButton {...props}>{buttonText}</ThemedButton>
    </Link>
  );
}
