import "./styles.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/packages/ui/components/ui/Toaster";
import MobileWrapper from "@repo/ui/components/MobileWrapper.tsx";
import CSSThemeProvider from "@/components/theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChooseTale",
  description: "게임 만들기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body className={`overflow-hidden ${inter.className}`}>
        <Toaster />
        <MobileWrapper>
          <CSSThemeProvider>
            <div className="h-[calc(100vh-80px)] flex flex-col">
              <div className="flex-1 overflow-y-scroll">
                <div className="w-full h-full flex flex-col">{children}</div>
              </div>
            </div>
          </CSSThemeProvider>
        </MobileWrapper>
      </body>
    </html>
  );
}
