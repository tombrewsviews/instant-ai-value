import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";
import StyleSelector, { StyleOption } from "@/components/StyleSelector";
import GeneratedPhotos, { GeneratedPhoto } from "@/components/GeneratedPhotos";
import { ChevronDown, Camera, Sparkles, UserCheck } from "lucide-react";

// Mock data for styles
const STYLE_OPTIONS: StyleOption[] = [
  {
    id: "corporate",
    name: "Corporate Professional",
    description: "Formal business attire with neutral background",
    previewUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "creative",
    name: "Creative Professional",
    description: "Modern, casual style for creative industries",
    previewUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "natural",
    name: "Natural & Approachable",
    description: "Warm, friendly look with soft lighting",
    previewUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop",
  },
];

// Mock data for generated photos (in a real app, these would come from the backend)
const MOCK_PHOTOS: GeneratedPhoto[] = [
  {
    id: "photo1",
    url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&h=500&auto=format&fit=crop",
    watermarked: true,
  },
  {
    id: "photo2",
    url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&h=500&auto=format&fit=crop",
    watermarked: true,
  },
  {
    id: "photo3",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&h=500&auto=format&fit=crop",
    watermarked: true,
  },
];

const Index: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLE_OPTIONS[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPhotos, setGeneratedPhotos] = useState<GeneratedPhoto[]>([]);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setGeneratedPhotos([]);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsGenerating(true);
    setGeneratedPhotos([]);

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);

      const apiUrl = import.meta.env.VITE_API_URL.replace(/\/$/, ''); // Remove trailing slash if present
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `A professional headshot in ${selectedStyle} style`
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process image");
      }

      const data = await response.json();
      
      // Convert the base64 images to URLs
      const photos = data.images.map((base64Image: string, index: number) => ({
        id: `photo${index + 1}`,
        url: base64Image.startsWith('data:') ? base64Image : `data:image/jpeg;base64,${base64Image}`,
        watermarked: false,
      }));

      setGeneratedPhotos(photos);
      toast.success("Your professional headshots are ready!");
    } catch (error) {
      console.error("Error generating photos:", error);
      toast.error("Failed to generate photos. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Professional Headshots
          </div>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 animate-slide-down">
            Turn your selfies into <br className="hidden md:block" />
            <span className="text-primary">professional headshots</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in">
            Transform your everyday photos into polished, professional headshots in seconds with our AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              View Examples
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">How it works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI transforms your photos into professional headshots in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Camera className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">1. Upload your photo</h3>
              <p className="text-muted-foreground">
                Start with any decent selfie or portrait photo. No professional equipment needed.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">2. Choose your style</h3>
              <p className="text-muted-foreground">
                Select from various professional styles to match your industry and personal brand.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UserCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">3. Get your headshots</h3>
              <p className="text-muted-foreground">
                Receive multiple professional headshot variations ready to use for LinkedIn, resumes, and more.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upload and Generation Section */}
      <section id="upload-section" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Create your headshots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload your photo, choose a style, and let our AI do the rest
            </p>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">1. Upload your photo</h3>
              <FileUploader onImageUpload={handleImageUpload} />
            </div>
            
            {uploadedImage && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xl font-medium">2. Choose a style</h3>
                <StyleSelector 
                  styles={STYLE_OPTIONS}
                  selectedStyle={selectedStyle}
                  onSelectStyle={setSelectedStyle}
                />
                
                <div className="mt-8 text-center">
                  <Button 
                    size="lg"
                    disabled={isGenerating} 
                    onClick={handleGenerate}
                    className="min-w-[200px]"
                  >
                    {isGenerating ? "Generating..." : "Generate Headshots"}
                  </Button>
                </div>
              </div>
            )}
            
            {(isGenerating || generatedPhotos.length > 0) && (
              <div className="mt-16 pt-10 border-t border-border">
                <GeneratedPhotos 
                  photos={generatedPhotos}
                  isGenerating={isGenerating}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Simple, transparent pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-background rounded-2xl border border-border p-8 flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Free</h3>
                <p className="text-3xl font-bold">$0</p>
                <p className="text-muted-foreground mt-2">Perfect for trying out the service</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">3 AI-generated headshots</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Basic style options</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Watermarked photos</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </div>
            
            {/* Pro Tier */}
            <div className="bg-background rounded-2xl border border-primary/20 p-8 flex flex-col h-full shadow-elevated relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Pro</h3>
                <p className="text-3xl font-bold">$9.99</p>
                <p className="text-muted-foreground mt-2">Perfect for individuals seeking quality headshots</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">10 AI-generated headshots</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">All style options</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">No watermarks</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">High-resolution downloads</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Priority processing</span>
                </li>
              </ul>
              
              <Button className="w-full">
                Choose Pro
              </Button>
            </div>
            
            {/* Business Tier */}
            <div className="bg-background rounded-2xl border border-border p-8 flex flex-col h-full">
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-2">Business</h3>
                <p className="text-3xl font-bold">$29.99</p>
                <p className="text-muted-foreground mt-2">Ideal for teams and businesses</p>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Unlimited headshots</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">All style options</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">No watermarks</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Ultra-high-resolution downloads</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Priority processing</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Team account with 5 users</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">API access</span>
                </li>
              </ul>
              
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials/Social Proof */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">What our users say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thousands of professionals have transformed their online presence with our AI headshots
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=100&h=100&auto=format&fit=crop"
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Alex Johnson</h4>
                  <p className="text-sm text-muted-foreground">Marketing Director</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "I needed a professional headshot for my LinkedIn profile and job applications. ProfileLens delivered exactly what I needed in minutes, not days or weeks."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&h=100&auto=format&fit=crop"
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Chen</h4>
                  <p className="text-sm text-muted-foreground">Software Engineer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The quality is incredible. I couldn't believe these were AI-generated. My LinkedIn profile now looks much more professional, and I've received more connection requests."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=100&h=100&auto=format&fit=crop"
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Michael Torres</h4>
                  <p className="text-sm text-muted-foreground">Startup Founder</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Our entire team uses ProfileLens for consistent, professional headshots. It saved us thousands compared to hiring a professional photographer."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6">Ready to transform your professional image?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have elevated their online presence with our AI-powered headshots.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 min-w-[200px]"
            onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Now
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
