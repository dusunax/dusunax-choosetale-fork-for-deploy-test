"use client";
import { Button } from "@repo/ui/components/ui/button.jsx";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Button title="">
        <Link href="story/create">storybuilder</Link>
      </Button>
    </main>
  );
}
