
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionDivider } from "@/components/ui/section-divider";
import { AnimatedSection } from "@/components/ui/animated-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <AuroraBackground />
      <div className="relative z-10">
        <Navbar />
        
        <AnimatedSection>
          <Hero />
        </AnimatedSection>
        
        <SectionDivider type="wave" />
        
        <AnimatedSection delay={0.2}>
          <About />
        </AnimatedSection>
        
        <SectionDivider type="curve" />
        
        <AnimatedSection delay={0.4}>
          <Events />
        </AnimatedSection>
        
        <SectionDivider type="diagonal" />
        
        <AnimatedSection delay={0.6}>
          <Team />
        </AnimatedSection>
        
        <SectionDivider type="wave" />
        
        <AnimatedSection delay={0.8}>
          <Contact />
        </AnimatedSection>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
