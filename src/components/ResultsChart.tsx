import { RIASECType, riasecLabels } from "@/data/hollandQuestions";

interface ResultsChartProps {
  scores: Record<RIASECType, number>;
  maxScore: number;
}

const typeColors: Record<RIASECType, string> = {
  R: 'bg-realistic',
  I: 'bg-investigative',
  A: 'bg-artistic',
  S: 'bg-social',
  E: 'bg-enterprising',
  C: 'bg-conventional',
};

const ResultsChart = ({ scores, maxScore }: ResultsChartProps) => {
  const types = Object.keys(scores) as RIASECType[];

  return (
    <div className="bg-card rounded-2xl p-8 card-shadow">
      <h3 className="font-display text-2xl mb-6 text-center">Your RIASEC Profile</h3>
      
      <div className="space-y-4">
        {types.map((type, index) => {
          const percentage = Math.round((scores[type] / maxScore) * 100);
          
          return (
            <div 
              key={type} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${typeColors[type]}`} />
                  <span className="font-medium">{riasecLabels[type]}</span>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  {scores[type]} / {maxScore} ({percentage}%)
                </span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${typeColors[type]} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${percentage}%`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsChart;
