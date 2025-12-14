import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              About the <span className="text-gradient italic">Holland Test</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Understanding the science behind career personality assessment
            </p>
          </div>

          {/* History Section */}
          <section className="mb-16 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl">The History</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground/80 leading-relaxed mb-4">
                The Holland Occupational Themes, also known as RIASEC, was developed by American 
                psychologist <strong>John L. Holland</strong> in the 1950s and 1970s. His theory suggests 
                that career choice is an expression of personality, and that people can be classified 
                into six basic personality types.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Holland's theory has become one of the most influential and widely used career 
                development theories, forming the basis for many career assessment tools and 
                vocational guidance programs worldwide.
              </p>
            </div>
          </section>

          {/* Theory Section */}
          <section className="mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl">The Theory</h2>
            </div>
            <div className="bg-card rounded-2xl p-8 card-shadow">
              <p className="text-foreground/80 leading-relaxed mb-6">
                Holland's theory is based on four key assumptions:
              </p>
              <ol className="space-y-4">
                {[
                  "Most people can be categorized as one of six personality types: Realistic, Investigative, Artistic, Social, Enterprising, or Conventional.",
                  "There are six corresponding work environments: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.",
                  "People search for environments that allow them to exercise their skills and abilities, express their attitudes and values, and take on agreeable problems and roles.",
                  "A person's behavior is determined by an interaction between their personality and their environment.",
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 rounded-full hero-gradient text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Applications Section */}
          <section className="mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-display text-3xl">Applications</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Career Counseling",
                  description: "Used by career counselors worldwide to help individuals understand their vocational preferences and make informed career decisions.",
                },
                {
                  title: "Education",
                  description: "Helps students explore academic paths and fields of study that align with their natural interests and abilities.",
                },
                {
                  title: "Hiring & HR",
                  description: "Organizations use Holland codes to match candidates with roles that fit their personality types, improving job satisfaction and retention.",
                },
                {
                  title: "Self-Discovery",
                  description: "Individuals use the assessment for personal development and understanding their work preferences better.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all">
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12">
              <h2 className="font-display text-3xl mb-4">Ready to Discover Your Type?</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Take our free assessment now and uncover your unique Holland Code in just 5 minutes.
              </p>
              <Button variant="hero" size="xl" onClick={() => navigate('/test')} className="group">
                Start Free Assessment
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
