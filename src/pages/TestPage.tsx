import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import TestPhaseIndicator from "@/components/TestPhaseIndicator";
import { Button } from "@/components/ui/button";
import { questions, RIASECType } from "@/data/hollandQuestions";
import { superQuestions, SuperDimension } from "@/data/superQuestions";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

const TestPage = () => {
  const navigate = useNavigate();
  const [testPhase, setTestPhase] = useState<'holland' | 'super'>('holland');
  const [hollandAnswers, setHollandAnswers] = useState<Record<number, number>>({});
  const [superAnswers, setSuperAnswers] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestions = testPhase === 'holland' ? questions : superQuestions;
  const currentAnswers = testPhase === 'holland' ? hollandAnswers : superAnswers;
  const setCurrentAnswers = testPhase === 'holland' ? setHollandAnswers : setSuperAnswers;

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
  const answeredCount = Object.keys(currentAnswers).length;
  const allCurrentQuestionsAnswered = answeredCount === currentQuestions.length;

  const handleAnswer = (questionId: number, score: number) => {
    setCurrentAnswers((prev) => ({ ...prev, [questionId]: score }));
    
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

  const proceedToSuperTest = () => {
    setTestPhase('super');
    setCurrentQuestionIndex(0);
  };

  const calculateResults = () => {
    // Calculate Holland scores
    const hollandScores: Record<RIASECType, number> = {
      R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
    };
    questions.forEach((question) => {
      const answer = hollandAnswers[question.id] || 0;
      hollandScores[question.type] += answer;
    });

    // Calculate Super scores
    const superScores: Record<SuperDimension, number> = {
      CP: 0, CE: 0, DM: 0, WO: 0, SC: 0,
    };
    superQuestions.forEach((question) => {
      const answer = superAnswers[question.id] || 0;
      superScores[question.dimension] += answer;
    });

    // Store results and navigate
    sessionStorage.setItem('hollandResults', JSON.stringify(hollandScores));
    sessionStorage.setItem('superResults', JSON.stringify(superScores));
    navigate('/results');
  };

  // Adapt question for QuestionCard component
  const adaptedQuestion = {
    id: currentQuestion.id,
    text: currentQuestion.text,
    type: 'type' in currentQuestion ? currentQuestion.type : 'R' as RIASECType,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          {/* Phase Indicator */}
          <TestPhaseIndicator 
            currentPhase={testPhase} 
            hollandCompleted={Object.keys(hollandAnswers).length === questions.length}
          />

          {/* Phase Title */}
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="font-display text-2xl mb-2">
              {testPhase === 'holland' ? 'Career Interests' : 'Career Readiness'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {testPhase === 'holland' 
                ? 'Discover what types of work environments and activities match your interests'
                : 'Assess your readiness for making career decisions'
              }
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8 animate-fade-in">
            <ProgressBar current={currentQuestionIndex + 1} total={currentQuestions.length} />
          </div>

          {/* Question */}
          <QuestionCard
            key={currentQuestion.id}
            question={adaptedQuestion}
            currentAnswer={currentAnswers[currentQuestion.id]}
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
              testPhase === 'holland' ? (
                <Button
                  variant="hero"
                  onClick={proceedToSuperTest}
                  disabled={!allCurrentQuestionsAnswered}
                  className="group"
                >
                  Continue to Part 2
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button
                  variant="hero"
                  onClick={calculateResults}
                  disabled={!allCurrentQuestionsAnswered}
                  className="group"
                >
                  View Results
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              )
            ) : (
              <Button variant="default" onClick={goToNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Quick navigation dots - scrollable on mobile */}
          <div className="relative mt-8">
            <div className="flex overflow-x-auto pb-2 gap-2 justify-start md:justify-center md:flex-wrap scrollbar-hide">
              {currentQuestions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full text-xs font-medium transition-all ${
                    index === currentQuestionIndex
                      ? 'hero-gradient text-primary-foreground scale-110'
                      : currentAnswers[q.id]
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Completion message */}
          {!allCurrentQuestionsAnswered && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              {answeredCount} of {currentQuestions.length} questions answered
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default TestPage;
