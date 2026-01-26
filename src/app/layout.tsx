import "./globals.css";
import Navigation from "@/components/Navigation";
import { Zilla_Slab } from "next/font/google";

const zillaSlab = Zilla_Slab({ subsets: ['latin'], weight: ['700'], variable: '--font-zilla', });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${zillaSlab.variable}`}>
      <body className=" bg-[#1E1E1E] antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
