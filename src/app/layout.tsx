"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from "next-auth/react";


const inter = Inter({ subsets: ["latin"] });


// export const metadata: Metadata = {
//   title: "ijtahed Academic Center",
//   description: "Institue Management System",
//   icons:{
//     icon: [
//       {media:'(prefers-color-scheme: light',
//         url:"/logo.png",
//         href:"/logo.png"

//       },
      
//         {
//           media:'(prefers-color-scheme: dark',
//           url:"/logo.png",
//           href:"/logo.png"
  
//         },
//     ]
//   }
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider>
          {children}
        </SessionProvider></body>
    </html>
  );
}
