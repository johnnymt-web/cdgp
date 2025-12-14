import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { questions, RIASECType } from "@/data/hollandQuestions";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TestPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
    
    // Auto-advance to next question after a brief delay
    if (!isLastQuestion) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const goToPrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const calculateResults = () => {
    const scores: Record<RIASECType, number> = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    questions.forEach((question) => {
      const answer = answers[question.id] || 0;
      scores[question.type] += answer;
    });

    // Store results in sessionStorage and navigate to results page
    sessionStorage.setItem('hollandResults', JSON.stringify(scores));
    navigate('/results');
  };

  const allQuestionsAnswered = answeredCount === questions.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8 animate-fade-in">
            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          </div>

          {/* Question */}
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            currentAnswer={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={isFirstQuestion}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                variant="hero"
                onClick={calculateResults}
                disabled={!allQuestionsAnswered}
                className="group"
              >
                View Results
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={goToNext}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Quick navigation dots */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                  index === currentQuestionIndex
                    ? 'hero-gradient text-primary-foreground scale-110'
                    : answers[q.id]
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Completion message */}
          {!allQuestionsAnswered && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              {answeredCount} of {questions.length} questions answered
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TestPage;
