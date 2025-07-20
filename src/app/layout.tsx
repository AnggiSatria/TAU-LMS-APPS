import type { Metadata } from "next";
import { Geist, Geist_Mono, Oxygen, Oxygen_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/shared/utils/RQueryProviders";
import ModalProvider from "@/shared/ui/components/organism/Modals";

const oxygenSans = Oxygen({
  variable: "--font-oxygen-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const oxygenMono = Oxygen_Mono({
  variable: "--font-oxygen-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/assets/images/logo-tau.png",
  },
  title: "LMS TAU | Landing Page",
  description: "LMS TAU APPS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxygenSans.variable} ${oxygenMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ModalProvider>{children}</ModalProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
