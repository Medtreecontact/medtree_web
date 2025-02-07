import type { Metadata } from "next";
import "./globals.css";
import { nunito } from "@/app/_ui/fonts"
import { AuthProvider } from "@/app/_ui/authContext";
import { Toaster } from "@/app/_ui/shadcn/components/ui/sonner";
import { ThemeProvider } from "./_ui/components/core/theme-provider";

export const metadata: Metadata = {
  title: "MedTree",
  description: "MedTree's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <AuthProvider>
            {children}
          <Toaster />
        </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
