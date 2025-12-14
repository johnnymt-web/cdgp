import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ResultsChart from "@/components/ResultsChart";
import TopTypesReport from "@/components/TopTypesReport";
import { Button } from "@/components/ui/button";
import { RIASECType } from "@/data/hollandQuestions";
import { RefreshCw, Download, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<Record<RIASECType, number> | null>(null);

  // Max possible score per type (7 questions × 5 points each)
  const maxScorePerType = 35;

  useEffect(() => {
    const storedResults = sessionStorage.getItem('hollandResults');
    if (storedResults) {
      setScores(JSON.parse(storedResults));
    } else {
      // No results found, redirect to test
      navigate('/test');
    }
  }, [navigate]);

  const handleRetakeTest = () => {
    sessionStorage.removeItem('hollandResults');
    navigate('/test');
  };

  const handleShare = async () => {
    if (!scores) return;
    
    const sortedTypes = (Object.entries(scores) as [RIASECType, number][])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    const hollandCode = sortedTypes.map(([type]) => type).join('');

    const shareText = `I just took the Holland Career Assessment! My Holland Code is ${hollandCode}. Find your career match too!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Holland Career Assessment Results',
          text: shareText,
          url: window.location.origin,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your results with friends.",
      });
    }
  };

  if (!scores) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading results...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 md:px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              Your <span className="text-gradient italic">Results</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Based on your responses, here's your unique career personality profile
            </p>
          </div>

          {/* Results Chart */}
          <div className="mb-12 animate-slide-up">
            <ResultsChart scores={scores} maxScore={maxScorePerType} />
          </div>

          {/* Top Types Report */}
          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <TopTypesReport scores={scores} />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" onClick={handleRetakeTest} className="group">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Test
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="mt-16 p-6 bg-secondary/50 rounded-xl text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This assessment is based on John Holland's RIASEC theory and is meant for 
              self-exploration purposes. For comprehensive career guidance, consider consulting with a 
              professional career counselor.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
