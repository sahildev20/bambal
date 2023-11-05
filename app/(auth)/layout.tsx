import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import React from "react";
import '../globals.css'
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
    title: 'Salah',
    description: 'A social media app especially designed for farmers of India.'

}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1 `}>
                    <div className="w-full flex justify-center items-center min-h-screen">
                        {children}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}