export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#1E1E1E] antialiased">
      {children}
    </div>
  );
}

