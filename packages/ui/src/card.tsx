import { type ReactNode } from "react";

export function Card({
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div
      className="ui-group ui-rounded-lg ui-border ui-border-transparent ui-px-5 ui-py-4 ui-transition-colors ui-border-neutral-700 ui-bg-neutral-800/30"
      rel="noopener noreferrer"
    >
      Shared UI: {children}
    </div>
  );
}
