import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Take Ease | 给正在焦虑中的你的一封未来来信",
  description:
    "叙事疗愈 × 人生模拟 × 互动小说。通过人生阶段选择，看见焦虑背后的保护与渴望。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF8F4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
