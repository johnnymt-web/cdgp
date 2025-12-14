import { riasecLabels, riasecDescriptions, RIASECType } from "@/data/hollandQuestions";
import { Wrench, Lightbulb, Palette, Heart, TrendingUp, ClipboardList } from "lucide-react";

const typeIcons: Record<RIASECType, React.ReactNode> = {
  R: <Wrench className="w-6 h-6" />,
  I: <Lightbulb className="w-6 h-6" />,
  A: <Palette className="w-6 h-6" />,
  S: <Heart className="w-6 h-6" />,
  E: <TrendingUp className="w-6 h-6" />,
  C: <ClipboardList className="w-6 h-6" />,
};

const typeColors: Record<RIASECType, string> = {
  R: 'bg-realistic/10 text-realistic border-realistic/30',
  I: 'bg-investigative/10 text-investigative border-investigative/30',
  A: 'bg-artistic/10 text-artistic border-artistic/30',
  S: 'bg-social/10 text-social border-social/30',
  E: 'bg-enterprising/10 text-enterprising border-enterprising/30',
  C: 'bg-conventional/10 text-conventional border-conventional/30',
};

const RIASECTypes = () => {
  const types = Object.keys(riasecLabels) as RIASECType[];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            The Six <span className="text-gradient italic">Personality</span> Types
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Holland's theory identifies six distinct personality types, each with unique characteristics and career preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {types.map((type, index) => (
            <div
              key={type}
              className="group bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 border ${typeColors[type]}`}>
                {typeIcons[type]}
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="font-display text-2xl">{riasecLabels[type]}</h3>
                <span className="text-sm text-muted-foreground">({riasecDescriptions[type].title})</span>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {riasecDescriptions[type].description}
              </p>

              <div className="pt-4 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-2">CAREER EXAMPLES</p>
                <div className="flex flex-wrap gap-2">
                  {riasecDescriptions[type].careers.slice(0, 4).map((career) => (
                    <span 
                      key={career}
                      className="px-2 py-1 text-xs bg-secondary rounded-md text-secondary-foreground"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RIASECTypes;
