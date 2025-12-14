import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RIASECTypes from "@/components/RIASECTypes";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Compass, Target, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Two Assessments Overview */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Two Powerful <span className="text-gradient italic">Assessments</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive approach combining career interests with career readiness
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Holland Assessment */}
            <div className="bg-card rounded-2xl p-8 card-shadow animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                  <Compass className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-2xl">Holland RIASEC</h3>
                  <p className="text-sm text-muted-foreground">Career Interests</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Based on John Holland's theory, this assessment identifies your work personality 
                type across six dimensions: Realistic, Investigative, Artistic, Social, 
                Enterprising, and Conventional.
              </p>
              <ul className="space-y-2">
                {['Discover your natural interests', 'Explore matching careers', 'Get your unique Holland Code'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Super Assessment */}
            <div className="bg-card rounded-2xl p-8 card-shadow animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-2xl">Super's Career Development</h3>
                  <p className="text-sm text-muted-foreground">Career Readiness</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Based on Donald Super's developmental theory, adapted for high school students. 
                Measures your career planning, exploration, decision-making, work knowledge, 
                and self-concept clarity.
              </p>
              <ul className="space-y-2">
                {['Assess your career readiness', 'Identify growth areas', 'Get actionable next steps'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

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
              Complete both assessments in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Interest Assessment",
                description: "Answer 42 questions about your work preferences and interests",
                icon: Compass,
              },
              {
                step: "02",
                title: "Readiness Assessment",
                description: "Complete 20 questions about your career development progress",
                icon: Target,
              },
              {
                step: "03",
                title: "Get Your Report",
                description: "Receive your Holland Code and Career Readiness profile",
                icon: BookOpen,
              },
              {
                step: "04",
                title: "Take Action",
                description: "Follow personalized recommendations for your career journey",
                icon: Users,
              },
            ].map((item, index) => (
              <div key={item.step} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl hero-gradient text-primary-foreground mb-4">
                  <item.icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">STEP {item.step}</div>
                <h3 className="font-display text-lg mb-2">{item.title}</h3>
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
                Why This <span className="text-gradient italic">Program?</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                This comprehensive assessment combines two research-backed frameworks used by 
                career counselors worldwide, specifically adapted for high school students 
                in grades 9-12.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Understand both your interests AND your readiness",
                  "Designed specifically for 9th-12th grade students",
                  "Get personalized career and college guidance",
                  "Identify areas to develop before graduation",
                  "Make informed decisions about your future",
                  "Completely free and takes only 10 minutes",
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
                Start Free Assessment
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
              <span className="font-display text-lg">CareerGuide</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Combining Holland's RIASEC & Super's Career Development Theory for Students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
