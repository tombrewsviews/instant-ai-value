
import React from "react";
import Logo from "./Logo";

const Footer: React.FC = () => {
  return (
    <footer className="w-full px-6 py-8 border-t border-border/40 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Logo />
          <p className="text-muted-foreground text-sm max-w-sm text-center md:text-left">
            Transform your everyday photos into professional headshots using our state-of-the-art AI technology.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-foreground font-medium">Product</h4>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Features</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Pricing</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Examples</a>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <h4 className="text-foreground font-medium">Resources</h4>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Help Center</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Blog</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">API</a>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3 col-span-2 md:col-span-1">
            <h4 className="text-foreground font-medium">Legal</h4>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border/40">
        <p className="text-muted-foreground text-sm text-center">
          © {new Date().getFullYear()} ProfileLens. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
