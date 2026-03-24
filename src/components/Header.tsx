import { FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
          <FileSearch className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-bold text-foreground">ResumeATS</span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Analyze
        </Link>
        <Link to="/tips" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Tips
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
