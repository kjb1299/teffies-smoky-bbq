// app/layout.tsx
import "./globals.css";
import { Zilla_Slab } from "next/font/google";

const zillaSlab = Zilla_Slab({ 
  subsets: ['latin'], 
  weight: ['400', '700'], // Added 400 for standard body text
  variable: '--font-zilla', 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${zillaSlab.variable}`}>
      <body className="bg-[#1E1E1E] antialiased">
        {children}
      </body>
    </html>
  );
}
