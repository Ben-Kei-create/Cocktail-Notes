import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Cocktail Notes — Discover the World of Cocktails",
  description:
    "A refined cocktail exploration app. Follow branching paths of mood, taste, and ingredients to discover cocktails and learn their stories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main style={{ paddingBottom: "5rem" }}>{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
