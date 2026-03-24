import { motion } from "framer-motion";
import Header from "@/components/Header";
import { CheckCircle2, XCircle, FileText, Type, Layout, ListChecks } from "lucide-react";

const tips = [
  {
    icon: FileText,
    title: "Use a Clean Format",
    dos: ["Use standard section headings (Experience, Education, Skills)", "Stick to single-column layouts", "Save as PDF unless instructed otherwise"],
    donts: ["Use tables, text boxes, or columns", "Add headers/footers with critical info", "Use images or graphics"],
  },
  {
    icon: Type,
    title: "Optimize Keywords",
    dos: ["Mirror exact phrases from the job description", "Include both acronyms and full terms (e.g., SEO & Search Engine Optimization)", "Use industry-standard job titles"],
    donts: ["Stuff keywords unnaturally", "Use creative job titles like 'Code Ninja'", "Rely only on soft skills"],
  },
  {
    icon: Layout,
    title: "Structure Content Well",
    dos: ["Start bullets with strong action verbs", "Quantify achievements with numbers", "Keep to 1-2 pages"],
    donts: ["Write long paragraphs", "Use personal pronouns (I, me, my)", "Include references on the resume"],
  },
  {
    icon: ListChecks,
    title: "Technical Best Practices",
    dos: ["Use standard fonts (Arial, Calibri, Times New Roman)", "Keep font size 10-12pt for body text", "Use consistent date formatting"],
    donts: ["Use special characters or symbols", "Compress into tiny font sizes", "Use colored or decorative fonts"],
  },
];

const Tips = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="mx-auto max-w-4xl px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground">ATS Optimization Tips</h1>
        <p className="mt-2 text-muted-foreground">Make your resume stand out to both humans and machines.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                <tip.icon className="h-4 w-4 text-accent" />
              </div>
              <h2 className="font-semibold text-foreground">{tip.title}</h2>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-score-excellent mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Do
                </p>
                <ul className="space-y-1">
                  {tip.dos.map((d) => (
                    <li key={d} className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-score-excellent/40">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-score-poor mb-1.5 flex items-center gap-1">
                  <XCircle className="h-3 w-3" /> Don't
                </p>
                <ul className="space-y-1">
                  {tip.donts.map((d) => (
                    <li key={d} className="text-sm text-muted-foreground pl-4 relative before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-score-poor/40">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  </div>
);

export default Tips;
