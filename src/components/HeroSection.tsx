import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Target, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 py-20">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Discover Your Career Path</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight max-w-4xl">
            Find Your{" "}
            <span className="text-gradient italic">Perfect</span>
            <br />
            Career Match
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Take the John Holland RIASEC Career Assessment to uncover your unique personality type 
            and discover careers that align with your natural interests and strengths.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate('/test')}
              className="group"
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="hero-outline" size="xl" onClick={() => navigate('/about')}>
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 md:gap-16 pt-12 mt-8 border-t border-border/50">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-display text-foreground">42</span>
              <span className="text-sm text-muted-foreground">Questions</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-display text-foreground">6</span>
              <span className="text-sm text-muted-foreground">Personality Types</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-display text-foreground">~5</span>
              <span className="text-sm text-muted-foreground">Minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
