import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RIASECType, riasecLabels, riasecDescriptions } from "@/data/hollandQuestions";
import { 
  SuperDimension, 
  superDimensionLabels, 
  getCareerMaturityLevel,
  getOverallReadinessInterpretation 
} from "@/data/superQuestions";

interface EmailResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hollandScores: Record<RIASECType, number> | null;
  superScores: Record<SuperDimension, number> | null;
  maxSuperScore: number;
}

const EmailResultsDialog = ({
  open,
  onOpenChange,
  hollandScores,
  superScores,
  maxSuperScore,
}: EmailResultsDialogProps) => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const generateEmailContent = () => {
    let content = `CAREER DEVELOPMENT ASSESSMENT RESULTS\n`;
    content += `${"=".repeat(50)}\n`;
    content += `Generated on: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}\n\n`;

    if (hollandScores) {
      const sortedTypes = (Object.entries(hollandScores) as [RIASECType, number][])
        .sort(([, a], [, b]) => b - a);
      const topThree = sortedTypes.slice(0, 3);
      const hollandCode = topThree.map(([type]) => type).join("");

      content += `CAREER INTERESTS (HOLLAND RIASEC)\n`;
      content += `${"-".repeat(40)}\n\n`;
      content += `Your Holland Code: ${hollandCode}\n\n`;

      content += `Top Career Personality Types:\n`;
      topThree.forEach(([type], index) => {
        content += `\n${index + 1}. ${riasecLabels[type]} - ${riasecDescriptions[type].title}\n`;
        content += `   ${riasecDescriptions[type].description}\n`;
        content += `   Recommended Careers: ${riasecDescriptions[type].careers.slice(0, 4).join(", ")}\n`;
      });

      content += `\nAll Scores:\n`;
      sortedTypes.forEach(([type, score]) => {
        const percentage = Math.round((score / 35) * 100);
        content += `  ${riasecLabels[type]}: ${score}/35 (${percentage}%)\n`;
      });
      content += "\n";
    }

    if (superScores) {
      const dimensions = Object.keys(superScores) as SuperDimension[];
      const totalScore = Object.values(superScores).reduce((sum, score) => sum + score, 0);
      const totalMaxScore = maxSuperScore * dimensions.length;
      const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);
      const interpretation = getOverallReadinessInterpretation(overallPercentage);

      content += `CAREER READINESS (SUPER'S CAREER DEVELOPMENT)\n`;
      content += `${"-".repeat(40)}\n\n`;
      content += `Overall Career Readiness: ${interpretation.level} (${overallPercentage}%)\n`;
      content += `${interpretation.message}\n\n`;

      content += `Dimension Scores:\n`;
      dimensions.forEach((dimension) => {
        const score = superScores[dimension];
        const percentage = Math.round((score / maxSuperScore) * 100);
        const level = getCareerMaturityLevel(percentage);
        content += `  ${superDimensionLabels[dimension]}: ${score}/${maxSuperScore} (${percentage}%) - ${level.charAt(0).toUpperCase() + level.slice(1)}\n`;
      });

      content += `\nRecommended Next Steps:\n`;
      interpretation.recommendations.forEach((rec, index) => {
        content += `  ${index + 1}. ${rec}\n`;
      });
    }

    content += `\n${"=".repeat(50)}\n`;
    content += `Career Development Guidance Program\n`;
    content += `This assessment combines Holland RIASEC and Super Career Development theories.\n`;
    content += `For comprehensive guidance, discuss results with a school counselor.\n`;

    return content;
  };

  const emailContent = generateEmailContent();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailContent);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Results copied. Paste into any email.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      });
    }
  };

  const handleOpenEmailClient = () => {
    const subject = encodeURIComponent("My Career Development Assessment Results");
    const body = encodeURIComponent(emailContent);
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
    
    toast({
      title: "Opening email client...",
      description: "Your default email app should open with the results.",
    });
  };

  const handleSendToGmail = () => {
    const subject = encodeURIComponent("My Career Development Assessment Results");
    const body = encodeURIComponent(emailContent);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${subject}&body=${body}`;
    window.open(gmailLink, "_blank");
    
    toast({
      title: "Opening Gmail...",
      description: "Gmail should open in a new tab with your results.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email Your Results
          </DialogTitle>
          <DialogDescription>
            Send your career assessment results to yourself, a counselor, or a parent/guardian.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="counselor@school.edu"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label>Results Preview</Label>
            <Textarea
              readOnly
              value={emailContent}
              className="h-48 font-mono text-xs resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="hero"
                onClick={handleOpenEmailClient}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Open in Email App
              </Button>
              <Button
                variant="outline"
                onClick={handleSendToGmail}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Gmail
              </Button>
            </div>
            
            <Button
              variant="secondary"
              onClick={handleCopyToClipboard}
              className="w-full"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Your results are not stored on any server. They are only shared when you send the email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailResultsDialog;
