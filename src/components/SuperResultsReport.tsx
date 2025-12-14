import { 
  SuperDimension, 
  superDimensionLabels, 
  superDimensionDescriptions,
  getCareerMaturityLevel,
  getOverallReadinessInterpretation
} from "@/data/superQuestions";
import { Target, TrendingUp, Lightbulb, CheckCircle } from "lucide-react";

interface SuperResultsReportProps {
  scores: Record<SuperDimension, number>;
  maxScore: number;
}

const dimensionColors: Record<SuperDimension, { bg: string; text: string; border: string }> = {
  CP: { bg: 'bg-realistic/10', text: 'text-realistic', border: 'border-realistic' },
  CE: { bg: 'bg-investigative/10', text: 'text-investigative', border: 'border-investigative' },
  DM: { bg: 'bg-artistic/10', text: 'text-artistic', border: 'border-artistic' },
  WO: { bg: 'bg-enterprising/10', text: 'text-enterprising', border: 'border-enterprising' },
  SC: { bg: 'bg-social/10', text: 'text-social', border: 'border-social' },
};

const SuperResultsReport = ({ scores, maxScore }: SuperResultsReportProps) => {
  const dimensions = Object.keys(scores) as SuperDimension[];
  
  // Calculate overall score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const totalMaxScore = maxScore * dimensions.length;
  const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);
  
  const overallInterpretation = getOverallReadinessInterpretation(overallPercentage);

  return (
    <div className="space-y-6">
      {/* Overall Career Readiness */}
      <div className="bg-card rounded-2xl p-8 card-shadow text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Career Readiness Level</span>
        </div>
        <div className="font-display text-4xl md:text-5xl text-gradient mb-2">
          {overallInterpretation.level}
        </div>
        <div className="text-2xl font-bold text-muted-foreground mb-4">
          {overallPercentage}%
        </div>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {overallInterpretation.message}
        </p>
      </div>

      {/* Dimension Scores Chart */}
      <div className="bg-card rounded-2xl p-8 card-shadow">
        <h3 className="font-display text-2xl mb-6 text-center">Career Development Dimensions</h3>
        
        <div className="space-y-4">
          {dimensions.map((dimension, index) => {
            const percentage = Math.round((scores[dimension] / maxScore) * 100);
            const level = getCareerMaturityLevel(percentage);
            
            return (
              <div 
                key={dimension} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${dimensionColors[dimension].text.replace('text-', 'bg-')}`} />
                    <span className="font-medium">{superDimensionLabels[dimension]}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      level === 'high' ? 'bg-green-100 text-green-700' :
                      level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {scores[dimension]} / {maxScore} ({percentage}%)
                  </span>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${dimensionColors[dimension].text.replace('text-', 'bg-')} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Dimension Insights */}
      <div className="grid md:grid-cols-2 gap-4">
        {dimensions.map((dimension, index) => {
          const percentage = Math.round((scores[dimension] / maxScore) * 100);
          const level = getCareerMaturityLevel(percentage);
          const desc = superDimensionDescriptions[dimension];
          
          return (
            <div 
              key={dimension}
              className={`bg-card rounded-2xl p-6 card-shadow animate-slide-up border-l-4 ${dimensionColors[dimension].border}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`font-display text-xl ${dimensionColors[dimension].text}`}>
                  {desc.title}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {desc.level[level]}
              </p>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> Tips to Improve
                </p>
                <ul className="space-y-1">
                  {desc.tips.slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-xs text-foreground/80 flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="bg-card rounded-2xl p-8 card-shadow">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-display text-2xl">Your Next Steps</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {overallInterpretation.recommendations.map((rec, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full hero-gradient text-primary-foreground text-sm font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <p className="text-sm text-foreground/80">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperResultsReport;
