import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saturn Labs | Human Data for a Physical World",
  description: "Multimodal human data, purpose-built for robots and embodied systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
