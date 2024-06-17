import { type ReactNode } from "react";

export function Card({
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-neutral-700 bg-neutral-800/30"
      rel="noopener noreferrer"
    >
      Shared UI: {children}
    </div>
  );
}
