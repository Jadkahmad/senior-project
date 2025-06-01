"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";


const inter = Inter({ subsets: ["latin"] });


{/*export const metadata: Metadata = {
  title: "ijtahed Academic Center",
  description: "Institue Management System",
  icons:{
    icon: [
      {media:'(prefers-color-scheme: light',
        url:"/logo.png",
        href:"/logo.png"

      },
      
        {
          media:'(prefers-color-scheme: dark',
          url:"/logo.png",
          href:"/logo.png"
  
        },
    ]
  }
};
*/}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={"className_d65c78" }> {/*inter.className*/}
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      <SessionProvider>
          {children}
        </SessionProvider></body>
    </html>
  );
}  
  

  
