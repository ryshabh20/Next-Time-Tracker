import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/redux-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastProvider } from "@/context/toastContext";
const inter = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time Tracker",
  description: "An Inhouse CRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ReduxProvider>
  );
}
