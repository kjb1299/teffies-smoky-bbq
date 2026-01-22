import "./globals.css";
import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#1E1E1E] antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
