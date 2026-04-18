import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ResultsChart from "@/components/ResultsChart";
import TopTypesReport from "@/components/TopTypesReport";
import SuperResultsReport from "@/components/SuperResultsReport";
import { Button } from "@/components/ui/button";
import { RIASECType } from "@/data/hollandQuestions";
import { SuperDimension } from "@/data/superQuestions";
import { RefreshCw, Share2, Compass, Target, Download, Printer, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generatePDF, printResults, generateShareableText } from "@/utils/pdfExport";
import EmailResultsDialog from "@/components/EmailResultsDialog";

const ResultsPage = () => {
  const navigate = useNavigate();
  const [hollandScores, setHollandScores] = useState<Record<RIASECType, number> | null>(null);
  const [superScores, setSuperScores] = useState<Record<SuperDimension, number> | null>(null);
  const [activeTab, setActiveTab] = useState<'holland' | 'super' | 'combined'>('combined');
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const maxHollandScorePerType = 35; // 7 questions × 5 points
  const maxSuperScorePerDimension = 20; // 4 questions × 5 points

  useEffect(() => {
    const storedHolland = sessionStorage.getItem('hollandResults');
    const storedSuper = sessionStorage.getItem('superResults');
    
    if (storedHolland) {
      setHollandScores(JSON.parse(storedHolland));
    }
    if (storedSuper) {
      setSuperScores(JSON.parse(storedSuper));
    }
    
    if (!storedHolland && !storedSuper) {
      navigate('/test');
    }
  }, [navigate]);

  const handleRetakeTest = () => {
    sessionStorage.removeItem('hollandResults');
    sessionStorage.removeItem('superResults');
    navigate('/test');
  };

  const handleShare = async () => {
    if (!hollandScores) return;
    
    const sortedTypes = (Object.entries(hollandScores) as [RIASECType, number][])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    const hollandCode = sortedTypes.map(([type]) => type).join('');

    const shareText = `I completed the Career Development Assessment! My Holland Code is ${hollandCode}. Discover your career path too!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Career Development Assessment Results',
          text: shareText,
          url: window.location.origin,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your results with friends.",
      });
    }
  };

  const handleExportPDF = async () => {
    toast({
      title: "Generating PDF...",
      description: "Please wait while we create your report.",
    });
    
    try {
      await generatePDF({
        hollandScores,
        superScores,
        maxHollandScore: maxHollandScorePerType,
        maxSuperScore: maxSuperScorePerDimension,
      });
      
      toast({
        title: "PDF Downloaded!",
        description: "Your career report has been saved.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePrint = () => {
    printResults();
  };

  if (!hollandScores && !superScores) {
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
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              Your <span className="text-gradient italic">Career Report</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive view of your career interests and readiness
            </p>
          </div>

          {/* Tab Navigation */}
          {hollandScores && superScores && (
            <div className="flex justify-center gap-2 mb-8 animate-fade-in">
              <Button
                variant={activeTab === 'combined' ? 'default' : 'outline'}
                onClick={() => setActiveTab('combined')}
                size="sm"
              >
                Full Report
              </Button>
              <Button
                variant={activeTab === 'holland' ? 'default' : 'outline'}
                onClick={() => setActiveTab('holland')}
                size="sm"
              >
                <Compass className="w-4 h-4 mr-2" />
                Interests
              </Button>
              <Button
                variant={activeTab === 'super' ? 'default' : 'outline'}
                onClick={() => setActiveTab('super')}
                size="sm"
              >
                <Target className="w-4 h-4 mr-2" />
                Readiness
              </Button>
            </div>
          )}

          {/* Combined/Full Report */}
          {(activeTab === 'combined' || activeTab === 'holland') && hollandScores && (
            <div className={activeTab === 'combined' ? 'mb-12' : ''}>
              {activeTab === 'combined' && (
                <div className="flex items-center gap-2 mb-6">
                  <Compass className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-2xl">Career Interests (Holland RIASEC)</h2>
                </div>
              )}
              <div className="mb-8 animate-slide-up">
                <ResultsChart scores={hollandScores} maxScore={maxHollandScorePerType} />
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <TopTypesReport scores={hollandScores} />
              </div>
            </div>
          )}

          {/* Super Career Readiness Report */}
          {(activeTab === 'combined' || activeTab === 'super') && superScores && (
            <div>
              {activeTab === 'combined' && (
                <div className="flex items-center gap-2 mb-6 mt-12">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-2xl">Career Readiness (Super's Career Development)</h2>
                </div>
              )}
              <div className="animate-slide-up" style={{ animationDelay: activeTab === 'combined' ? '0.4s' : '0s' }}>
                <SuperResultsReport scores={superScores} maxScore={maxSuperScorePerDimension} />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 mt-12 animate-slide-up no-print" style={{ animationDelay: '0.6s' }}>
            <Button variant="hero" onClick={handleExportPDF} className="group">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={() => setEmailDialogOpen(true)}>
              <Mail className="w-4 h-4 mr-2" />
              Email Results
            </Button>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" onClick={handleRetakeTest}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake
            </Button>
          </div>

          {/* Email Dialog */}
          <EmailResultsDialog
            open={emailDialogOpen}
            onOpenChange={setEmailDialogOpen}
            hollandScores={hollandScores}
            superScores={superScores}
            maxSuperScore={maxSuperScorePerDimension}
          />

          {/* Disclaimer */}
          <div className="mt-16 p-6 bg-secondary/50 rounded-xl text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This assessment combines John Holland's RIASEC theory with Donald Super's 
              Career Development theory, adapted for high school students. For comprehensive career guidance, 
              consider discussing your results with a school counselor or career development professional.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;
