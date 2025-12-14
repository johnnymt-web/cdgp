import { RIASECType, riasecLabels, riasecDescriptions } from "@/data/hollandQuestions";
import { Trophy, Briefcase, Star } from "lucide-react";

interface TopTypesReportProps {
  scores: Record<RIASECType, number>;
}

const typeColors: Record<RIASECType, { bg: string; text: string; border: string }> = {
  R: { bg: 'bg-realistic/10', text: 'text-realistic', border: 'border-realistic' },
  I: { bg: 'bg-investigative/10', text: 'text-investigative', border: 'border-investigative' },
  A: { bg: 'bg-artistic/10', text: 'text-artistic', border: 'border-artistic' },
  S: { bg: 'bg-social/10', text: 'text-social', border: 'border-social' },
  E: { bg: 'bg-enterprising/10', text: 'text-enterprising', border: 'border-enterprising' },
  C: { bg: 'bg-conventional/10', text: 'text-conventional', border: 'border-conventional' },
};

const TopTypesReport = ({ scores }: TopTypesReportProps) => {
  const sortedTypes = (Object.entries(scores) as [RIASECType, number][])
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const hollandCode = sortedTypes.map(([type]) => type).join('');

  return (
    <div className="space-y-6">
      {/* Holland Code */}
      <div className="bg-card rounded-2xl p-8 card-shadow text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Your Holland Code</span>
        </div>
        <div className="font-display text-5xl md:text-6xl text-gradient mb-4">
          {hollandCode}
        </div>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Your top three personality types that define your unique career profile
        </p>
      </div>

      {/* Top Types Details */}
      <div className="grid md:grid-cols-3 gap-4">
        {sortedTypes.map(([type, score], index) => (
          <div 
            key={type}
            className={`bg-card rounded-2xl p-6 card-shadow animate-slide-up border-l-4 ${typeColors[type].border}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-lg font-bold ${typeColors[type].text}`}>#{index + 1}</span>
              <span className="font-display text-xl">{riasecLabels[type]}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {riasecDescriptions[type].title}
            </p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {riasecDescriptions[type].description}
            </p>
          </div>
        ))}
      </div>

      {/* Career Recommendations */}
      <div className="bg-card rounded-2xl p-8 card-shadow">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="font-display text-2xl">Recommended Careers</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {sortedTypes.map(([type], index) => (
            <div key={type}>
              <h4 className={`font-semibold mb-3 ${typeColors[type].text}`}>
                {riasecLabels[type]} Careers
              </h4>
              <ul className="space-y-2">
                {riasecDescriptions[type].careers.map((career) => (
                  <li key={career} className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-muted-foreground" />
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTypesReport;
