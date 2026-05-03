import { AuthProvider } from "@/contexts/authContext";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TikTok Clone",
  description: "A TikTok clone built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right"/>
        </AuthProvider>
      </body>
    </html>
  );
}