import { AnalysisResult } from "@/components/ResultsDashboard";

// Client-side keyword analysis (used as fallback or supplement)
export function analyzeResumeText(resumeText: string, jobDescription: string): AnalysisResult {
  const resumeLower = resumeText.toLowerCase();
  const jobLower = jobDescription.toLowerCase();

  // Extract keywords from job description
  const commonWords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with",
    "by", "from", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "do", "does", "did", "will", "would", "could", "should", "may", "might", "must", "shall",
    "can", "need", "dare", "ought", "used", "this", "that", "these", "those", "i", "me", "my",
    "we", "our", "you", "your", "he", "she", "it", "they", "them", "their", "what", "which",
    "who", "whom", "whose", "where", "when", "how", "not", "no", "nor", "as", "if", "then",
    "than", "too", "very", "just", "about", "above", "after", "again", "all", "also", "am",
    "any", "because", "before", "between", "both", "each", "few", "more", "most", "other",
    "some", "such", "into", "over", "own", "same", "so", "only", "up", "out", "off",
  ]);

  const jobWords = jobLower
    .replace(/[^a-z0-9\s+#.-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !commonWords.has(w));

  // Count frequency and get top keywords
  const freq: Record<string, number> = {};
  jobWords.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
  const keywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([word]) => word);

  const matchedKeywords = keywords.filter((kw) => resumeLower.includes(kw));
  const missingKeywords = keywords.filter((kw) => !resumeLower.includes(kw));

  // Score calculation
  const keywordScore = keywords.length > 0 ? (matchedKeywords.length / keywords.length) * 50 : 25;

  // Formatting checks
  const formattingIssues: string[] = [];
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount < 150) formattingIssues.push("Resume appears too short. Aim for at least 300 words.");
  if (wordCount > 1200) formattingIssues.push("Resume may be too long. Consider condensing to 1-2 pages.");
  if (!/education|academic/i.test(resumeText)) formattingIssues.push("Missing 'Education' section heading.");
  if (!/experience|employment|work history/i.test(resumeText)) formattingIssues.push("Missing 'Experience' section heading.");
  if (!/skills|technical skills|competencies/i.test(resumeText)) formattingIssues.push("Missing 'Skills' section heading.");

  const formatScore = Math.max(0, 25 - formattingIssues.length * 5);

  // Readability
  const readabilityNotes: string[] = [];
  const sentences = resumeText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSentenceLength = sentences.length > 0 ? wordCount / sentences.length : 0;
  if (avgSentenceLength > 25) readabilityNotes.push("Some sentences are too long. Keep them under 20 words.");
  if (!/\d/.test(resumeText)) readabilityNotes.push("Add quantified achievements (numbers, percentages, metrics).");

  const actionVerbs = ["led", "managed", "developed", "created", "implemented", "designed", "achieved", "increased", "reduced", "built"];
  const hasActionVerbs = actionVerbs.some((v) => resumeLower.includes(v));
  if (!hasActionVerbs) readabilityNotes.push("Use strong action verbs to start your bullet points.");

  const readabilityScore = Math.max(0, 25 - readabilityNotes.length * 5);

  // Strengths
  const strengths: string[] = [];
  if (matchedKeywords.length > 5) strengths.push("Strong keyword alignment with the job description.");
  if (hasActionVerbs) strengths.push("Good use of action verbs.");
  if (/\d+%|\d+\+/.test(resumeText)) strengths.push("Includes quantified achievements.");
  if (formattingIssues.length === 0) strengths.push("Well-structured with standard section headings.");
  if (wordCount >= 300 && wordCount <= 800) strengths.push("Appropriate resume length.");
  if (strengths.length === 0) strengths.push("Resume submitted for analysis — a great first step!");

  // Suggestions
  const suggestions: string[] = [];
  if (missingKeywords.length > 0) {
    suggestions.push(`Incorporate these missing keywords naturally: ${missingKeywords.slice(0, 5).join(", ")}`);
  }
  if (!/@/.test(resumeText)) suggestions.push("Ensure your contact email is included.");
  if (!/linkedin|github/i.test(resumeText)) suggestions.push("Consider adding your LinkedIn or portfolio URL.");
  suggestions.push("Tailor your resume for each specific job application.");

  const totalScore = Math.round(Math.min(100, keywordScore + formatScore + readabilityScore));

  const summary =
    totalScore >= 80
      ? "Your resume is well-optimized for ATS systems. Minor tweaks could boost it further."
      : totalScore >= 60
        ? "Your resume has a solid foundation but needs some improvements for better ATS compatibility."
        : totalScore >= 40
          ? "Several areas need attention to improve your chances of passing ATS screening."
          : "Your resume needs significant improvements to pass most ATS systems.";

  return {
    score: totalScore,
    summary,
    matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 10),
    formattingIssues,
    suggestions,
    readabilityNotes,
    strengths,
  };
}
