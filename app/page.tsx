import { Header } from "./ui/landpage/Header";
import { Hero } from "./ui/landpage/Hero";
import { Features } from "./ui/landpage/Features";
import { HowItWorks } from "./ui/landpage/HowItWorks";
import { Security } from "./ui/landpage/Security";
import { Footer } from "./ui/landpage/Footer";
import { TopAnnouncementBar } from "./ui/landpage/TopAnnouncementBar";

export default function SECPHome() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
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
