import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RIASECTypes from "@/components/RIASECTypes";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* RIASEC Types Section */}
      <RIASECTypes />

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              How It <span className="text-gradient italic">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Complete the assessment in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Answer Questions",
                description: "Rate how well each statement describes you on a scale of 1-5",
              },
              {
                step: "02",
                title: "Get Your Code",
                description: "Receive your unique three-letter Holland Code based on your responses",
              },
              {
                step: "03",
                title: "Explore Careers",
                description: "Discover careers that match your personality type and interests",
              },
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl hero-gradient text-primary-foreground text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="font-display text-4xl md:text-5xl mb-6">
                Why Take the <span className="text-gradient italic">Holland Test?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                The Holland Occupational Themes (RIASEC) is one of the most widely used career 
                assessment tools, backed by decades of research and used by career counselors worldwide.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Understand your natural work preferences",
                  "Discover careers aligned with your personality",
                  "Make informed educational decisions",
                  "Increase job satisfaction and success",
                  "Completely free and takes only 5 minutes",
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="hero" 
                size="xl" 
                className="mt-8 group"
                onClick={() => navigate('/test')}
              >
                Take Free Assessment
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center">
                <div className="grid grid-cols-3 grid-rows-2 gap-4 p-8">
                  {['R', 'I', 'A', 'S', 'E', 'C'].map((letter, index) => (
                    <div
                      key={letter}
                      className="w-20 h-20 md:w-24 md:h-24 bg-card rounded-xl card-shadow flex items-center justify-center font-display text-3xl md:text-4xl text-primary animate-scale-in"
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">C</span>
              </div>
              <span className="font-display text-lg">CareerMatch</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on John Holland's RIASEC Theory of Career Choice
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
