import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";
import { HowItWorks } from "./_components/HowItWorks";
import { Security } from "./_components/Security";
import { Footer } from "./_components/Footer";
import { TopAnnouncementBar } from "./_components/TopAnnouncementBar";

export default function SECPHome() {
  return (
    <div className="min-h-screen text-zinc-900">
      {/* <div className="min-h-screen bg-white text-zinc-900"> JUAREZ */}
      {/* Top announcement bar */}
      <TopAnnouncementBar />
      {/* Header */}
      <Header />
      {/* Hero */}
      <Hero />
      {/* Features */}
      <Features />
      {/* How it works */}
      <HowItWorks />
      {/* Security callout */}
      <Security />
      {/* Footer */}
      <Footer />
    </div>
  );
}
