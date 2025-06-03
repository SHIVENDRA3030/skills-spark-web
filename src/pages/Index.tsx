
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CyberCursor } from "@/components/CyberCursor";
import { MatrixRain } from "@/components/MatrixRain";
import { FloatingParticles } from "@/components/FloatingParticles";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Tech Background Effects */}
      <MatrixRain />
      <FloatingParticles />
      
      {/* Custom Cursor */}
      <CyberCursor />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Events />
        <Team />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
