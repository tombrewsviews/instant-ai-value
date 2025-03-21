
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import Header from "@/components/Header";

interface Profile {
  id: number;
  name: string;
  title: string;
  photo: string;
}

const Backend = () => {
  const [backendUrl, setBackendUrl] = useState("http://localhost:5000");
  const [isConnected, setIsConnected] = useState(false);

  // Health check query
  const healthQuery = useQuery({
    queryKey: ["health"],
    queryFn: api.healthCheck,
    retry: 1,
    enabled: false,
  });

  // Profiles query
  const profilesQuery = useQuery({
    queryKey: ["profiles"],
    queryFn: api.getProfiles,
    enabled: isConnected,
  });

  // Check backend connection
  const checkConnection = async () => {
    try {
      await healthQuery.refetch();
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Backend Integration</h1>
          
          {/* Backend Connection Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Backend Connection</CardTitle>
              <CardDescription>
                Check if your backend is running and accessible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {isConnected ? "Connected" : "Disconnected"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Backend URL:</span>
                  <code className="px-2 py-1 bg-muted rounded text-sm">{backendUrl}</code>
                </div>
                {healthQuery.isSuccess && (
                  <div className="bg-muted p-3 rounded">
                    <pre className="text-xs">{JSON.stringify(healthQuery.data, null, 2)}</pre>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={checkConnection} 
                disabled={healthQuery.isFetching}
                variant="default"
              >
                {healthQuery.isFetching ? "Checking..." : "Check Connection"}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Profiles Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profiles from Backend</CardTitle>
              <CardDescription>
                Fetch and display profiles from your backend API
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected ? (
                <div className="text-center p-4 text-muted-foreground">
                  Connect to backend first to view profiles
                </div>
              ) : profilesQuery.isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <Skeleton className="h-12 w-12 rounded-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : profilesQuery.isError ? (
                <div className="text-center p-4 text-destructive">
                  Error loading profiles. Make sure your backend is running.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profilesQuery.data?.map((profile: Profile) => (
                    <div key={profile.id} className="flex items-center gap-3 p-4 border rounded-lg">
                      <img 
                        src={profile.photo} 
                        alt={profile.name} 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">{profile.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => profilesQuery.refetch()}
                disabled={!isConnected || profilesQuery.isFetching}
                variant="outline"
              >
                {profilesQuery.isFetching ? "Loading..." : "Refresh Profiles"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Backend;
