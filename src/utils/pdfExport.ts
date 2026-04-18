import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RIASECType, riasecLabels, riasecDescriptions } from '@/data/hollandQuestions';
import { 
  SuperDimension, 
  superDimensionLabels, 
  superDimensionDescriptions,
  getCareerMaturityLevel,
  getOverallReadinessInterpretation 
} from '@/data/superQuestions';

interface ExportOptions {
  hollandScores: Record<RIASECType, number> | null;
  superScores: Record<SuperDimension, number> | null;
  maxHollandScore: number;
  maxSuperScore: number;
}

export const generatePDF = async (options: ExportOptions): Promise<void> => {
  const { hollandScores, superScores, maxHollandScore, maxSuperScore } = options;
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  // Header
  pdf.setFillColor(14, 165, 233); // Primary blue
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Career Development Report', margin, 25);
  
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}`, margin, 34);

  yPosition = 55;
  pdf.setTextColor(30, 41, 59);

  // Holland RIASEC Results
  if (hollandScores) {
    const sortedTypes = (Object.entries(hollandScores) as [RIASECType, number][])
      .sort(([, a], [, b]) => b - a);
    const topThree = sortedTypes.slice(0, 3);
    const hollandCode = topThree.map(([type]) => type).join('');

    // Section Header
    pdf.setFillColor(240, 249, 255);
    pdf.rect(margin, yPosition - 5, pageWidth - (margin * 2), 12, 'F');
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(14, 165, 233);
    pdf.text('Career Interests (Holland RIASEC)', margin + 3, yPosition + 3);
    yPosition += 15;

    // Holland Code
    pdf.setTextColor(30, 41, 59);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Your Holland Code:', margin, yPosition);
    
    pdf.setFontSize(28);
    pdf.setTextColor(14, 165, 233);
    pdf.text(hollandCode, margin + 45, yPosition + 2);
    yPosition += 15;

    // Scores Bar Chart
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(30, 41, 59);

    const barHeight = 6;
    const maxBarWidth = 100;
    const labelWidth = 25;

    sortedTypes.forEach(([type, score], index) => {
      const percentage = (score / maxHollandScore) * 100;
      const barWidth = (percentage / 100) * maxBarWidth;

      // Label
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${type}`, margin, yPosition + 4);
      pdf.setFont('helvetica', 'normal');
      pdf.text(riasecLabels[type], margin + 8, yPosition + 4);

      // Background bar
      pdf.setFillColor(226, 232, 240);
      pdf.rect(margin + labelWidth + 35, yPosition, maxBarWidth, barHeight, 'F');

      // Score bar
      const colors: Record<RIASECType, [number, number, number]> = {
        R: [249, 115, 22],  // Orange
        I: [139, 92, 246],   // Purple
        A: [236, 72, 153],   // Pink
        S: [234, 179, 8],    // Yellow
        E: [34, 197, 94],    // Green
        C: [14, 165, 233],   // Blue
      };
      const [r, g, b] = colors[type];
      pdf.setFillColor(r, g, b);
      pdf.rect(margin + labelWidth + 35, yPosition, barWidth, barHeight, 'F');

      // Score text
      pdf.text(`${score}/${maxHollandScore} (${Math.round(percentage)}%)`, margin + labelWidth + 140, yPosition + 4);

      yPosition += 10;
    });

    yPosition += 5;

    // Top 3 Career Types Details
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Your Top Career Personality Types:', margin, yPosition);
    yPosition += 8;

    topThree.forEach(([type], index) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text(`${index + 1}. ${riasecLabels[type]} - ${riasecDescriptions[type].title}`, margin, yPosition);
      yPosition += 5;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      const description = riasecDescriptions[type].description;
      const lines = pdf.splitTextToSize(description, pageWidth - (margin * 2) - 5);
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + 5, yPosition);
        yPosition += 4;
      });
      
      // Careers
      pdf.setFont('helvetica', 'italic');
      pdf.text(`Careers: ${riasecDescriptions[type].careers.slice(0, 5).join(', ')}`, margin + 5, yPosition);
      yPosition += 8;
    });

    yPosition += 5;
  }

  // Super Career Readiness Results
  if (superScores) {
    // Check if we need a new page
    if (yPosition > pageHeight - 100) {
      pdf.addPage();
      yPosition = margin;
    }

    const dimensions = Object.keys(superScores) as SuperDimension[];
    const totalScore = Object.values(superScores).reduce((sum, score) => sum + score, 0);
    const totalMaxScore = maxSuperScore * dimensions.length;
    const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);
    const interpretation = getOverallReadinessInterpretation(overallPercentage);

    // Section Header
    pdf.setFillColor(240, 249, 255);
    pdf.rect(margin, yPosition - 5, pageWidth - (margin * 2), 12, 'F');
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(14, 165, 233);
    pdf.text('Career Readiness (Super\'s Career Development)', margin + 3, yPosition + 3);
    yPosition += 15;

    // Overall Score
    pdf.setTextColor(30, 41, 59);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Career Readiness Level: ${interpretation.level} (${overallPercentage}%)`, margin, yPosition);
    yPosition += 8;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const msgLines = pdf.splitTextToSize(interpretation.message, pageWidth - (margin * 2));
    msgLines.forEach((line: string) => {
      pdf.text(line, margin, yPosition);
      yPosition += 4;
    });
    yPosition += 5;

    // Dimension Scores
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Dimension Scores:', margin, yPosition);
    yPosition += 8;

    const barHeight = 5;
    const maxBarWidth = 80;

    dimensions.forEach((dimension) => {
      const score = superScores[dimension];
      const percentage = Math.round((score / maxSuperScore) * 100);
      const level = getCareerMaturityLevel(percentage);
      const barWidth = (percentage / 100) * maxBarWidth;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.text(superDimensionLabels[dimension], margin, yPosition + 3);

      // Background bar
      pdf.setFillColor(226, 232, 240);
      pdf.rect(margin + 50, yPosition, maxBarWidth, barHeight, 'F');

      // Score bar
      const levelColors: Record<string, [number, number, number]> = {
        high: [34, 197, 94],
        medium: [234, 179, 8],
        low: [239, 68, 68],
      };
      const [r, g, b] = levelColors[level];
      pdf.setFillColor(r, g, b);
      pdf.rect(margin + 50, yPosition, barWidth, barHeight, 'F');

      // Score text
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${score}/${maxSuperScore} (${percentage}%) - ${level.charAt(0).toUpperCase() + level.slice(1)}`, margin + 135, yPosition + 3);

      yPosition += 9;
    });

    yPosition += 5;

    // Recommendations
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Recommended Next Steps:', margin, yPosition);
    yPosition += 6;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    interpretation.recommendations.forEach((rec, index) => {
      const recLines = pdf.splitTextToSize(`${index + 1}. ${rec}`, pageWidth - (margin * 2) - 10);
      recLines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + 5, yPosition);
        yPosition += 4;
      });
      yPosition += 2;
    });
  }

  // Footer
  const footerY = pageHeight - 15;
  pdf.setFillColor(240, 249, 255);
  pdf.rect(0, footerY - 5, pageWidth, 20, 'F');
  pdf.setFontSize(8);
  pdf.setTextColor(100, 116, 139);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Career Development Guidance Program - For educational guidance purposes only.', margin, footerY);
  pdf.text('Based on Holland RIASEC and Super Career Development theories.', margin, footerY + 4);

  // Download the PDF
  const hollandCode = hollandScores 
    ? (Object.entries(hollandScores) as [RIASECType, number][])
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([type]) => type)
        .join('')
    : 'assessment';
  
  pdf.save(`career-report-${hollandCode}-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const printResults = (): void => {
  window.print();
};

// Export results as shareable text
export const generateShareableText = (
  hollandScores: Record<RIASECType, number> | null,
  superScores: Record<SuperDimension, number> | null,
  maxSuperScore: number
): string => {
  let text = 'My Career Development Assessment Results\n\n';

  if (hollandScores) {
    const sortedTypes = (Object.entries(hollandScores) as [RIASECType, number][])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
    const hollandCode = sortedTypes.map(([type]) => type).join('');
    
    text += `Holland Code: ${hollandCode}\n`;
    text += `Top Types: ${sortedTypes.map(([type]) => riasecLabels[type]).join(', ')}\n\n`;
  }

  if (superScores) {
    const dimensions = Object.keys(superScores) as SuperDimension[];
    const totalScore = Object.values(superScores).reduce((sum, score) => sum + score, 0);
    const totalMaxScore = maxSuperScore * dimensions.length;
    const overallPercentage = Math.round((totalScore / totalMaxScore) * 100);
    const interpretation = getOverallReadinessInterpretation(overallPercentage);
    
    text += `Career Readiness: ${interpretation.level} (${overallPercentage}%)\n`;
  }

  text += '\nDiscover your career path at: ' + window.location.origin;
  
  return text;
};
