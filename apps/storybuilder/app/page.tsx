"use client";
import { Card } from "@repo/ui/card";
import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Card title="">
        <Link href="story/create">storybuilder</Link>
      </Card>
    </main>
  );
}
