import jsPDF from 'jspdf';

// Types matching the Analytics Dashboard
interface KPIData {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

interface Topic {
  name: string;
  views: number;
  engagement: number;
  conversionRate: number;
}

interface ContentFormat {
  name: string;
  views: number;
}

interface AnalyticsExportData {
  kpiData: KPIData[];
  topicsData: Topic[];
  contentFormatsData: ContentFormat[];
  aiInsights: string[];
  recommendations: {
    continue: string[];
    stop: string[];
    create: string[];
  };
}

/**
 * Generates a PDF report with analytics data
 * @param data - Analytics data containing KPIs, topics, content formats, insights, and recommendations
 * @param fileName - Optional custom file name (defaults to "Analytics_Report_[YYYY-MM-DD].pdf")
 */
export const generateAnalyticsPDF = (
  data: AnalyticsExportData,
  fileName?: string
): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Configuration
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Color utility function
  const setColorRGB = (doc: jsPDF, color: [number, number, number], mode: 'fill' | 'text' | 'draw') => {
    if (mode === 'fill') {
      doc.setFillColor(color[0], color[1], color[2]);
    } else if (mode === 'text') {
      doc.setTextColor(color[0], color[1], color[2]);
    } else if (mode === 'draw') {
      doc.setDrawColor(color[0], color[1], color[2]);
    }
  };

  // Colors
  const primaryColor: [number, number, number] = [52, 152, 219]; // Blue
  const accentColor: [number, number, number] = [231, 76, 60]; // Red
  const darkGray: [number, number, number] = [44, 62, 80]; // Dark
  const lightGray: [number, number, number] = [189, 195, 199]; // Light
  const successColor: [number, number, number] = [46, 204, 113]; // Green

  // Helper function to add section title
  const addSectionTitle = (title: string) => {
    doc.setFontSize(14);
    setColorRGB(doc, darkGray, 'text');
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPosition);
    yPosition += 8;

    // Underline
    setColorRGB(doc, primaryColor, 'draw');
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
    yPosition += 5;
  };

  // Helper function to check if we need a new page
  const checkNewPage = (spaceNeeded: number) => {
    if (yPosition + spaceNeeded > pageHeight - 15) {
      doc.addPage();
      yPosition = margin;
      // Add header on new page
      addPageHeader();
    }
  };

  // Helper function to add page header
  const addPageHeader = () => {
    const pageNum = (doc as any).internal.getNumberOfPages?.() || 1;
    doc.setFontSize(10);
    setColorRGB(doc, lightGray, 'text');
    doc.setFont('helvetica', 'normal');
    doc.text(`Page ${pageNum}`, pageWidth - margin - 20, margin - 5);
  };

  // ===== PAGE 1: TITLE AND KPI SUMMARY =====

  // Logo/Title
  doc.setFontSize(28);
  setColorRGB(doc, primaryColor, 'text');
  doc.setFont('helvetica', 'bold');
  doc.text('Analytics Report', margin, yPosition);
  yPosition += 15;

  // Date
  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.setFontSize(11);
  setColorRGB(doc, lightGray, 'text');
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on ${reportDate}`, margin, yPosition);
  yPosition += 15;

  // Branding info
  doc.setFontSize(10);
  setColorRGB(doc, darkGray, 'text');
  doc.setFont('helvetica', 'italic');
  doc.text('ContentPulse • AI-Powered Analytics Platform', margin, yPosition);
  yPosition += 12;

  // KPI Summary Section
  addSectionTitle('KPI Summary');
  yPosition += 3;

  // KPI Cards in grid format
  const kpiBoxHeight = 20;
  const kpiBoxWidth = (contentWidth - 6) / 2; // 2 columns with 6mm gap
  const gap = 6;

  for (let i = 0; i < data.kpiData.length; i += 2) {
    checkNewPage(kpiBoxHeight * 2 + 10);

    // First column
    drawKPIBox(
      doc,
      margin,
      yPosition,
      kpiBoxWidth,
      kpiBoxHeight,
      data.kpiData[i],
      darkGray,
      setColorRGB
    );

    // Second column (if exists)
    if (data.kpiData[i + 1]) {
      drawKPIBox(
        doc,
        margin + kpiBoxWidth + gap,
        yPosition,
        kpiBoxWidth,
        kpiBoxHeight,
        data.kpiData[i + 1],
        darkGray,
        setColorRGB
      );
    }

    yPosition += kpiBoxHeight + 3;
  }

  yPosition += 5;

  // ===== PAGE 2/3: TOP PERFORMING TOPICS =====
  checkNewPage(50);

  addSectionTitle('Top Performing Topics');
  yPosition += 2;

  // Table headers
  const tableColWidths = [40, 30, 30, 30];
  const tableHeaderHeight = 8;

  setColorRGB(doc, primaryColor, 'fill');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);

  let xPos = margin;
  doc.rect(margin, yPosition, contentWidth, tableHeaderHeight, 'F');

  doc.text('Topic', xPos + 2, yPosition + 5);
  xPos += tableColWidths[0];
  doc.text('Views', xPos + 2, yPosition + 5);
  xPos += tableColWidths[1];
  doc.text('Engagement', xPos + 2, yPosition + 5);
  xPos += tableColWidths[2];
  doc.text('Conversion', xPos + 2, yPosition + 5);

  yPosition += tableHeaderHeight;

  // Table rows
  setColorRGB(doc, darkGray, 'text');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const rowHeight = 7;

  data.topicsData.forEach((topic, index) => {
    checkNewPage(rowHeight + 2);

    // Alternate row colors
    if (index % 2 === 0) {
      setColorRGB(doc, [245, 245, 245], 'fill');
      doc.rect(margin, yPosition, contentWidth, rowHeight, 'F');
    }

    xPos = margin;
    doc.text(topic.name, xPos + 2, yPosition + 4);
    xPos += tableColWidths[0];
    doc.text((topic.views / 1000).toFixed(1) + 'K', xPos + 2, yPosition + 4);
    xPos += tableColWidths[1];
    doc.text(topic.engagement.toFixed(1) + '%', xPos + 2, yPosition + 4);
    xPos += tableColWidths[2];
    doc.text(topic.conversionRate.toFixed(1) + '%', xPos + 2, yPosition + 4);

    // Border
    setColorRGB(doc, lightGray, 'draw');
    doc.setLineWidth(0.1);
    doc.rect(margin, yPosition, contentWidth, rowHeight);

    yPosition += rowHeight;
  });

  yPosition += 8;

  // ===== CONTENT FORMAT PERFORMANCE =====
  checkNewPage(50);

  addSectionTitle('Content Format Performance');
  yPosition += 2;

  // Calculate total views for percentages
  const totalViews = data.contentFormatsData.reduce((sum, cf) => sum + cf.views, 0);
  const barWidth = contentWidth * 0.6;
  const formatRowHeight = 10;

  doc.setFontSize(9);

  data.contentFormatsData.forEach((format) => {
    checkNewPage(formatRowHeight + 2);

    const percentage = (format.views / totalViews) * 100;
    const filledWidth = (percentage / 100) * barWidth;

    // Format name
    setColorRGB(doc, darkGray, 'text');
    doc.setFont('helvetica', 'bold');
    doc.text(format.name, margin, yPosition + 4);

    // Views count and percentage
    doc.setFont('helvetica', 'normal');
    const viewsText = `${format.views.toLocaleString()} (${percentage.toFixed(1)}%)`;
    doc.text(viewsText, margin + barWidth + 5, yPosition + 4);

    // Background bar
    setColorRGB(doc, lightGray, 'fill');
    doc.rect(margin, yPosition + 5, barWidth, 3, 'F');

    // Filled bar
    setColorRGB(doc, primaryColor, 'fill');
    doc.rect(margin, yPosition + 5, filledWidth, 3, 'F');

    yPosition += formatRowHeight;
  });

  yPosition += 8;

  // ===== AI INSIGHTS =====
  checkNewPage(50);

  addSectionTitle('AI Insights & Analysis');
  yPosition += 2;

  doc.setFontSize(9);
  setColorRGB(doc, darkGray, 'text');

  data.aiInsights.forEach((insight, index) => {
    checkNewPage(12);

    // Bullet number
    doc.setFont('helvetica', 'bold');
    setColorRGB(doc, primaryColor, 'text');
    doc.text(`${index + 1}.`, margin, yPosition);

    // Insight text
    doc.setFont('helvetica', 'normal');
    setColorRGB(doc, darkGray, 'text');
    const wrappedText = doc.splitTextToSize(insight, contentWidth - 10);
    doc.text(wrappedText, margin + 8, yPosition);

    const textHeight = wrappedText.length * 4;
    yPosition += textHeight + 2;
  });

  yPosition += 8;

  // ===== RECOMMENDATIONS =====
  checkNewPage(60);

  addSectionTitle('Strategic Recommendations');
  yPosition += 4;

  const columnWidth = (contentWidth - 4) / 3;
  const colGap = 2;
  const recBoxHeight = 50;

  // Continue Column
  drawRecommendationBox(
    doc,
    margin,
    yPosition,
    columnWidth,
    recBoxHeight,
    'CONTINUE',
    data.recommendations.continue,
    successColor,
    darkGray,
    setColorRGB
  );

  // Stop Column
  drawRecommendationBox(
    doc,
    margin + columnWidth + colGap,
    yPosition,
    columnWidth,
    recBoxHeight,
    'STOP',
    data.recommendations.stop,
    accentColor,
    darkGray,
    setColorRGB
  );

  // Create Column
  drawRecommendationBox(
    doc,
    margin + 2 * (columnWidth + colGap),
    yPosition,
    columnWidth,
    recBoxHeight,
    'CREATE NEXT',
    data.recommendations.create,
    primaryColor,
    darkGray,
    setColorRGB
  );

  yPosition += recBoxHeight + 8;

  // ===== FOOTER =====
  checkNewPage(20);

  // Footer line
  setColorRGB(doc, lightGray, 'draw');
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 20, pageWidth - margin, pageHeight - 20);

  doc.setFontSize(8);
  setColorRGB(doc, lightGray, 'text');
  doc.setFont('helvetica', 'normal');
  doc.text('ContentPulse Analytics © 2024 | Confidential', margin, pageHeight - 15);

  setColorRGB(doc, lightGray, 'text');
  doc.text(`Report Generated: ${reportDate}`, pageWidth - margin - 50, pageHeight - 15);

  // Page numbers
  const pageNum = (doc as any).internal.getNumberOfPages?.() || 1;
  doc.text(`Page ${pageNum}`, pageWidth - margin - 20, pageHeight - 10);

  // Save PDF
  const defaultFileName = `Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName || defaultFileName);
};

/**
 * Helper function to draw a KPI box
 */
function drawKPIBox(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  kpi: KPIData,
  darkGray: [number, number, number],
  setColorRGB: (doc: jsPDF, color: [number, number, number], mode: 'fill' | 'text' | 'draw') => void
): void {
  // Background
  setColorRGB(doc, [245, 250, 255], 'fill');
  setColorRGB(doc, [173, 216, 230], 'draw');
  doc.setLineWidth(0.5);
  doc.rect(x, y, width, height, 'FD');

  // KPI Label
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text(kpi.label, x + 3, y + 4);

  // KPI Value
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  setColorRGB(doc, darkGray, 'text');
  doc.text(kpi.value, x + 3, y + 12);

  // Change indicator
  doc.setFontSize(10);
  const changeText = `${kpi.trend === 'up' ? '↑' : '↓'} ${Math.abs(kpi.change)}%`;
  const changeColor: [number, number, number] =
    kpi.trend === 'up' ? [46, 204, 113] : [231, 76, 60];
  setColorRGB(doc, changeColor, 'text');
  doc.setFont('helvetica', 'bold');
  doc.text(changeText, x + 3, y + 18);
}

/**
 * Helper function to draw a recommendation box
 */
function drawRecommendationBox(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  items: string[],
  color: [number, number, number],
  darkGray: [number, number, number],
  setColorRGB: (doc: jsPDF, color: [number, number, number], mode: 'fill' | 'text' | 'draw') => void
): void {
  // Background
  const lightColor: [number, number, number] = [
    Math.min(color[0] + 50, 255),
    Math.min(color[1] + 50, 255),
    Math.min(color[2] + 50, 255),
  ];
  setColorRGB(doc, lightColor, 'fill');
  doc.rect(x, y, width, height, 'F');

  // Border
  setColorRGB(doc, color, 'draw');
  doc.setLineWidth(1);
  doc.rect(x, y, width, height);

  // Title
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setColorRGB(doc, color, 'text');
  doc.text(title, x + 3, y + 6);

  // Items
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  setColorRGB(doc, darkGray, 'text');

  let itemY = y + 13;
  items.forEach((item) => {
    const wrappedText = doc.splitTextToSize(item, width - 6);
    doc.text(wrappedText, x + 3, itemY);
    itemY += wrappedText.length * 3 + 2;
  });
}
