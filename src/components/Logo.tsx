
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
        <div className="absolute w-5 h-5 rounded-full bg-primary-foreground top-1 left-1.5" />
        <div className="absolute w-2 h-2 rounded-full bg-primary bottom-1 right-1.5" />
      </div>
      <span className="font-medium text-xl tracking-tight">ProfileLens</span>
    </div>
  );
};

export default Logo;
