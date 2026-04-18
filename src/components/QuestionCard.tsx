import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Question } from "@/data/hollandQuestions";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  currentAnswer: number | undefined;
  onAnswer: (questionId: number, score: number) => void;
}

const answerOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
];

const QuestionCard = ({ question, currentAnswer, onAnswer }: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-8 card-shadow animate-scale-in">
      <p className="text-lg sm:text-xl md:text-2xl font-display text-foreground mb-6 sm:mb-8 text-center leading-relaxed">
        &ldquo;{question.text}&rdquo;
      </p>

      {/* Mobile: 5 horizontal compact buttons */}
      <div className="flex sm:hidden gap-2 justify-center">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={cn(
              "flex-1 max-w-16 aspect-square rounded-xl border-2 border-border flex flex-col items-center justify-center transition-all active:scale-95",
              currentAnswer === option.value 
                ? "border-primary bg-primary/10 ring-2 ring-primary/20" 
                : "hover:border-primary/50"
            )}
          >
            <span className="text-xl font-display">{option.value}</span>
          </button>
        ))}
      </div>
      
      {/* Mobile: Labels below */}
      <div className="flex sm:hidden justify-between text-[10px] text-muted-foreground mt-2 px-1">
        <span>Disagree</span>
        <span>Agree</span>
      </div>

      {/* Desktop: Full buttons */}
      <div className="hidden sm:flex gap-3 justify-center">
        {answerOptions.map((option) => (
          <Button
            key={option.value}
            variant="riasec"
            onClick={() => onAnswer(question.id, option.value)}
            className={cn(
              "flex-1 h-auto py-4 px-4 flex flex-col gap-1 transition-all",
              currentAnswer === option.value && "border-primary bg-primary/5 ring-2 ring-primary/20"
            )}
          >
            <span className="text-2xl font-display">{option.value}</span>
            <span className="text-xs text-muted-foreground">{option.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
