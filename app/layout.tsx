
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  toast, { Toaster } from 'react-hot-toast';
import StateProvider from "@/lib/features/Provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StoreIt",
  description: "Your cloud storage solution",
  icons:{
    icon:'/assets/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  

  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StateProvider>
            
            {children}

          <Toaster
            toastOptions={{
              success: {
                iconTheme: {
                  primary: '#EA6365',
                  secondary: 'white',
                },
              },
            }}
          />

        </StateProvider>
      </body>
    </html>
  );
}
