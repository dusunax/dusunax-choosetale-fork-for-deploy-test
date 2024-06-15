import { type ReactNode } from "react";

export function Card({
  children,
  href,
}: {
  title: string;
  children: ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      className="ui-group ui-rounded-lg ui-border ui-border-transparent ui-px-5 ui-py-4 ui-transition-colors ui-border-neutral-700 ui-bg-neutral-800/30"
      href={`${href}?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"`}
      rel="noopener noreferrer"
      target="_blank"
    >
      Shared UI: {children}
    </a>
  );
}
