import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 w-full">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
