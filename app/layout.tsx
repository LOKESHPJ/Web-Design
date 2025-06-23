import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Project Ara - Modular Smartphone Revolution",
  description:
    "The world's first truly modular smartphone. Swap components instantly. Build your perfect device, your way. Join the revolution.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}


import './globals.css'