import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/literata";
// import "keen-slider/keen-slider.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Textbook-like Explanation",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "textbook-like explanation",
    "school-level definition",
    "AI-Novel Summary",
    "academic terms",
    "educational resources",
  ],
  description: "Baptist Hugh School Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}