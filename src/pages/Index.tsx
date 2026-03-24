import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import ResultsDashboard, { AnalysisResult } from "@/components/ResultsDashboard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeResumeText } from "@/lib/analyzeResume";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        resolve(text);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({ title: "No file selected", description: "Please upload your resume first.", variant: "destructive" });
      return;
    }
    if (!jobDescription.trim()) {
      toast({ title: "No job description", description: "Please paste a job description for comparison.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const resumeText = await extractTextFromFile(file);
      // Simulate processing time for better UX
      await new Promise((r) => setTimeout(r, 1500));
      const analysis = analyzeResumeText(resumeText, jobDescription);
      setResult(analysis);
    } catch {
      toast({ title: "Analysis failed", description: "Could not read the file. Try a different format.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              {/* Hero */}
              <div className="text-center space-y-3 py-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  <Sparkles className="h-3 w-3" />
                  AI-Powered Analysis
                </motion.div>
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                  Is your resume <span className="text-gradient-hero">ATS-ready?</span>
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Upload your resume and paste a job description. Get an instant compatibility score with actionable feedback.
                </p>
              </div>

              {/* Upload Section */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-card space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Resume</label>
                  <FileUpload
                    onFileSelect={setFile}
                    selectedFile={file}
                    onClear={() => setFile(null)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Job Description</label>
                  <Textarea
                    placeholder="Paste the job description here..."
                    className="min-h-[140px] resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !file}
                  className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity h-11"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Resume
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { label: "Keyword Match", desc: "vs. job description" },
                  { label: "Format Check", desc: "ATS compatibility" },
                  { label: "Smart Tips", desc: "Actionable feedback" },
                ].map((f) => (
                  <div key={f.label} className="text-center">
                    <p className="text-sm font-semibold text-foreground">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground">Analysis Results</h1>
                <Button
                  variant="outline"
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                    setJobDescription("");
                  }}
                >
                  New Analysis
                </Button>
              </div>
              <ResultsDashboard result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
