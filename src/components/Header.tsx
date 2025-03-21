
import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 border-b border-border/40 backdrop-blur-md bg-background/80 fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="link" className="text-muted-foreground hover:text-foreground">
            How it works
          </Button>
          <Link to="/backend">
            <Button variant="link" className="text-muted-foreground hover:text-foreground">
              Backend
            </Button>
          </Link>
          <Button variant="link" className="text-muted-foreground hover:text-foreground">
            Pricing
          </Button>
          <Button variant="outline" className="shadow-subtle">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
