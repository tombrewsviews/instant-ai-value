
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center px-6 py-32">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-medium mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6">Page not found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-10">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button size="lg" asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
