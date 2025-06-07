import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hi-API - Premium AI Service Aggregator",
  description: "The most comprehensive AI service aggregator platform with 50+ providers for image, video, audio, 3D, and text generation. Professional tools for creators and developers.",
  keywords: "AI, API, aggregator, image generation, video generation, audio generation, 3D generation, text generation, DALL-E, Midjourney, Stable Diffusion",
  authors: [{ name: "Hi-API Team" }],
  creator: "Hi-API",
  publisher: "Hi-API",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0066FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-inter antialiased min-h-screen bg-gradient-light">
        {children}
      </body>
    </html>
  );
}
