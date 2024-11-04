import type { Metadata } from "next";
import "./globals.css";
import { nunito } from "@/app/_ui/fonts"
import { ThemeProvider } from "./_ui/components/theme-provider";

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
    <html lang="fr">
      <body
        className={`${nunito.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
