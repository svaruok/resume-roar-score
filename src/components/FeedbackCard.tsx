import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeedbackCardProps {
  icon: LucideIcon;
  title: string;
  items: string[];
  variant: "success" | "warning" | "error" | "info";
  delay?: number;
}

const variantStyles = {
  success: "border-score-excellent/20 bg-score-excellent/5",
  warning: "border-score-fair/20 bg-score-fair/5",
  error: "border-score-poor/20 bg-score-poor/5",
  info: "border-accent/20 bg-accent/5",
};

const iconStyles = {
  success: "text-score-excellent bg-score-excellent/10",
  warning: "text-score-fair bg-score-fair/10",
  error: "text-score-poor bg-score-poor/10",
  info: "text-accent bg-accent/10",
};

const FeedbackCard = ({ icon: Icon, title, items, variant, delay = 0 }: FeedbackCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className={`rounded-xl border p-5 ${variantStyles[variant]}`}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconStyles[variant]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default FeedbackCard;
