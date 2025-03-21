
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface GeneratedPhoto {
  id: string;
  url: string;
  watermarked: boolean;
}

interface GeneratedPhotosProps {
  photos: GeneratedPhoto[];
  isGenerating: boolean;
  className?: string;
}

const GeneratedPhotos: React.FC<GeneratedPhotosProps> = ({
  photos,
  isGenerating,
  className,
}) => {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(
    photos.length > 0 ? photos[0].id : null
  );

  const selectedPhoto = photos.find((photo) => photo.id === selectedPhotoId);

  const handleDownload = (photo: GeneratedPhoto) => {
    // In a real app, this would trigger a download
    toast.success("Download started!");
    
    // Simulating download with a timeout
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = photo.url;
      link.download = `profilelens-photo-${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
  };

  const handleShare = (photo: GeneratedPhoto) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my professional headshot from ProfileLens',
        text: 'I just created this professional headshot using AI!',
        url: photo.url,
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => toast.error("Error sharing"));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(photo.url)
        .then(() => toast.success("Photo URL copied to clipboard!"))
        .catch(() => toast.error("Failed to copy URL"));
    }
  };

  if (isGenerating) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="text-center">
          <h3 className="text-xl font-medium">Generating your headshots...</h3>
          <p className="text-muted-foreground mt-2">
            Our AI is working on your professional photos. This may take up to 30 seconds.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-muted animate-pulse-slow shimmer" />
          ))}
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center animate-fade-in">
        <h3 className="text-xl font-medium">Your professional headshots</h3>
        <p className="text-muted-foreground mt-2">
          Select your favorite headshot to download or share
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 animate-slide-up">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={cn(
              "aspect-square rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:shadow-elevated border",
              selectedPhotoId === photo.id 
                ? "ring-2 ring-primary border-primary transform scale-[1.02]" 
                : "border-muted/50 hover:border-muted-foreground/30"
            )}
            onClick={() => setSelectedPhotoId(photo.id)}
          >
            <img 
              src={photo.url} 
              alt="Generated headshot" 
              className="w-full h-full object-cover"
            />
            {photo.watermarked && (
              <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                Watermarked
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mt-6 animate-fade-in">
          <Button
            onClick={() => handleDownload(selectedPhoto)}
            className="w-full sm:w-auto"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Selected Photo
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare(selectedPhoto)}
            className="w-full sm:w-auto"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      )}

      {photos.some(p => p.watermarked) && (
        <p className="text-sm text-muted-foreground text-center animate-fade-in">
          Watermarked photos are free for personal use. 
          <a href="#" className="text-primary font-medium ml-1 hover:underline">
            Upgrade to remove watermarks.
          </a>
        </p>
      )}
    </div>
  );
};

export default GeneratedPhotos;
