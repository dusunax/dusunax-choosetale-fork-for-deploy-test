import { PropsWithChildren } from "react";

export default function MobileWrapper({ children }: PropsWithChildren) {
  return <div className="max-w-xl mx-auto bg-white">{children}</div>;
}
