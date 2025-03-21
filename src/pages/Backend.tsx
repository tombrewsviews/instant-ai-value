
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Server, Code, Database, Key, Globe, ArrowRight } from "lucide-react";

const Backend: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Backend Services for <span className="text-primary">Koyeb</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Easily deployable services that work well with Koyeb's infrastructure
          </p>
        </div>
      </section>
      
      {/* Backend Options Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option 1: FastAPI */}
            <div className="bg-muted/30 rounded-2xl p-8 border border-border hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Server className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-medium mb-3">FastAPI Backend</h3>
              <p className="text-muted-foreground mb-4">
                A modern, fast Python web framework for building APIs with automatic OpenAPI documentation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Simple Dockerfile setup</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Async support for AI workloads</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Excellent for ML model serving</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Option 2: Node.js Express */}
            <div className="bg-muted/30 rounded-2xl p-8 border border-border hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-medium mb-3">Node.js Express</h3>
              <p className="text-muted-foreground mb-4">
                Fast, unopinionated, minimalist web framework for Node.js with extensive middleware support.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Same language as frontend (TypeScript)</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Extensive ecosystem of packages</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Easy integration with frontend</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Option 3: PostgreSQL */}
            <div className="bg-muted/30 rounded-2xl p-8 border border-border hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-medium mb-3">PostgreSQL Database</h3>
              <p className="text-muted-foreground mb-4">
                Powerful, open-source object-relational database system with strong reputation for reliability.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Managed PostgreSQL on Koyeb</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Store user data and preferences</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Connect via Prisma or other ORMs</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* Option 4: Auth and API Integration */}
            <div className="bg-muted/30 rounded-2xl p-8 border border-border hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-medium mb-3">Auth & API Integration</h3>
              <p className="text-muted-foreground mb-4">
                Use Auth0, Firebase Auth, or custom JWT authentication with secure API key management.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Simple JWT implementation</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Secure storage of API keys</span>
                </li>
                <li className="flex items-start">
                  <div className="rounded-full bg-primary/10 p-1 mr-3 mt-0.5">
                    <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm">Connect to third-party AI services</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Deployment Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-medium mb-4">Ready to Deploy on Koyeb</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Koyeb provides a simple platform for deploying and scaling your applications with global edge deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              View Deployment Guide
            </Button>
            <Button variant="outline" size="lg">
              Learn About Koyeb
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Backend;
