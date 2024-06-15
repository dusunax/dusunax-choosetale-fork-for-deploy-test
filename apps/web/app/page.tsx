import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="flex flex-col gap-4">
        <Link href="/story">storybuilder</Link>
        <Link href="/game">game</Link>
        <Link href="/google">google</Link>
      </div>
    </main>
  );
}
