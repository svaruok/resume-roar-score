import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb, Tag, BookOpen, FileWarning } from "lucide-react";
import ScoreRing from "./ScoreRing";
import FeedbackCard from "./FeedbackCard";

export interface AnalysisResult {
  score: number;
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  suggestions: string[];
  readabilityNotes: string[];
  strengths: string[];
}

interface ResultsDashboardProps {
  result: AnalysisResult;
}

const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Score Header */}
      <div className="flex flex-col items-center text-center gap-4 py-6">
        <ScoreRing score={result.score} />
        <div>
          <h2 className="text-xl font-bold text-foreground">ATS Compatibility Score</h2>
          <p className="mt-1 text-sm text-muted-foreground max-w-md">{result.summary}</p>
        </div>
      </div>

      {/* Keywords */}
      {(result.matchedKeywords.length > 0 || result.missingKeywords.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-5 shadow-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Keyword Analysis</h3>
          </div>
          {result.matchedKeywords.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Matched Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedKeywords.map((kw) => (
                  <span key={kw} className="inline-flex items-center rounded-md bg-score-excellent/10 px-2 py-0.5 text-xs font-medium text-score-excellent">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.missingKeywords.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Missing Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {result.missingKeywords.map((kw) => (
                  <span key={kw} className="inline-flex items-center rounded-md bg-score-poor/10 px-2 py-0.5 text-xs font-medium text-score-poor">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Feedback Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {result.strengths.length > 0 && (
          <FeedbackCard icon={CheckCircle2} title="Strengths" items={result.strengths} variant="success" delay={0.3} />
        )}
        {result.formattingIssues.length > 0 && (
          <FeedbackCard icon={FileWarning} title="Formatting Issues" items={result.formattingIssues} variant="warning" delay={0.4} />
        )}
        {result.readabilityNotes.length > 0 && (
          <FeedbackCard icon={BookOpen} title="Readability" items={result.readabilityNotes} variant="info" delay={0.5} />
        )}
        {result.suggestions.length > 0 && (
          <FeedbackCard icon={Lightbulb} title="Suggestions" items={result.suggestions} variant="info" delay={0.6} />
        )}
      </div>
    </motion.div>
  );
};

export default ResultsDashboard;
