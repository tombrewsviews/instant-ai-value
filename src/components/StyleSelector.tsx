
import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
}

interface StyleSelectorProps {
  styles: StyleOption[];
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
  className?: string;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  styles,
  selectedStyle,
  onSelectStyle,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {styles.map((style) => (
        <div
          key={style.id}
          className={cn(
            "relative border rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-elevated group",
            selectedStyle === style.id 
              ? "border-primary ring-2 ring-primary/20" 
              : "border-muted hover:border-muted-foreground/30"
          )}
          onClick={() => onSelectStyle(style.id)}
        >
          <div className="aspect-square overflow-hidden">
            <img 
              src={style.previewUrl} 
              alt={style.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h4 className="font-medium flex items-center gap-2">
              {selectedStyle === style.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
              {style.name}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {style.description}
            </p>
          </div>
          {selectedStyle === style.id && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StyleSelector;
