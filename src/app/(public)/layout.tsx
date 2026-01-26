import Navigation from "@/components/Navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main>
        {children}
      </main>
    </>
  );
}