
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onImageUpload: (file: File) => void;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onImageUpload, className }) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      if (file.type.startsWith("image/")) {
        onImageUpload(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onImageUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });
  
  const removeImage = () => {
    setPreview(null);
  };

  return (
    <div className={cn("w-full", className)}>
      {!preview ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "w-full h-64 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center cursor-pointer p-6",
            isDragActive 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3 max-w-sm text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">Upload your photo</h3>
            <p className="text-muted-foreground text-sm">
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG and WebP up to 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full overflow-hidden rounded-2xl bg-muted/30 animate-scale-up">
          <img 
            src={preview} 
            alt="Uploaded preview" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 w-full p-4 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-background/80 backdrop-blur-sm border-white/20 text-white hover:bg-background/90"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
              <div 
                {...getRootProps()} 
                className="bg-background/80 backdrop-blur-sm border border-white/20 text-white hover:bg-background/90 rounded-md px-3 py-1 text-sm font-medium flex items-center gap-2 cursor-pointer"
              >
                <input {...getInputProps()} />
                <ImageIcon className="h-4 w-4" />
                Change
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
