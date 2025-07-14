import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Heart, Sparkles } from "lucide-react";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Oops! Missing details",
        description: "Please enter both username and password to continue your journey! 🌟",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage for demo
      localStorage.setItem("vyapyaar_user", JSON.stringify({ username }));
      
      toast({
        title: "Welcome to VyaPyaarAI! 🎉",
        description: `Namaste ${username}! Ready to build your dreams?`,
      });
      
      navigate("/home");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-primary p-3 rounded-full">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            VyaPyaarAI
          </h1>
          <p className="text-muted-foreground mt-2">
            Your loving business companion 💕
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">Welcome Back!</CardTitle>
            <CardDescription>
              Ready to continue building your business dreams? ✨
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="transition-all duration-300 focus:shadow-warm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-300 focus:shadow-warm"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium py-6 transition-all duration-300 hover:shadow-elegant"
                disabled={isLoading}
              >
                {isLoading ? "Getting ready..." : "Let's Start! 🚀"}
              </Button>
            </form>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              New here? Don't worry, we'll guide you step by step! 💪
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}