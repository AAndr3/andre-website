import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Pain from "@/components/Pain";
import DashboardSection from "@/components/DashboardSection";
import ValueStack from "@/components/ValueStack";
import ComparisonTable from "@/components/ComparisonTable";
import Guarantee from "@/components/Guarantee";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Divider = () => (
  <div className="max-w-[1400px] mx-auto px-4 md:px-10 lg:px-20">
    <div className="h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
  </div>
);

export default function Home() {
  return (
    <main className="min-h-[100dvh] bg-zinc-950 w-full">
      <Nav />
      <Hero />
      <Marquee />
      <Pain />
      <Divider />
      <DashboardSection />
      <Divider />
      <ValueStack />
      <Divider />
      <ComparisonTable />
      <Divider />
      <Guarantee />
      <Divider />
      <FAQ />
      <Divider />
      <Testimonials />
      <Divider />
      <About />
      <FinalCTA />
      <Divider />
      <ContactSection />
      <Footer />
    </main>
  );
}
