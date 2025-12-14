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
    <div className="bg-card rounded-2xl p-8 card-shadow animate-scale-in">
      <p className="text-xl md:text-2xl font-display text-foreground mb-8 text-center leading-relaxed">
        "{question.text}"
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
