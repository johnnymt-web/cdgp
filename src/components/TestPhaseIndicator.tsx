import { Compass, Target } from "lucide-react";

interface TestPhaseIndicatorProps {
  currentPhase: 'holland' | 'super';
  hollandCompleted: boolean;
}

const TestPhaseIndicator = ({ currentPhase, hollandCompleted }: TestPhaseIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        currentPhase === 'holland' 
          ? 'hero-gradient text-primary-foreground' 
          : hollandCompleted 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-secondary text-muted-foreground'
      }`}>
        <Compass className="w-4 h-4" />
        <span className="text-sm font-medium">Interest Assessment</span>
        {hollandCompleted && currentPhase !== 'holland' && (
          <span className="text-xs">✓</span>
        )}
      </div>
      
      <div className="w-8 h-0.5 bg-secondary" />
      
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        currentPhase === 'super' 
          ? 'hero-gradient text-primary-foreground' 
          : 'bg-secondary text-muted-foreground'
      }`}>
        <Target className="w-4 h-4" />
        <span className="text-sm font-medium">Readiness Assessment</span>
      </div>
    </div>
  );
};

export default TestPhaseIndicator;
