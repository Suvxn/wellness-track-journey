
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter your password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email, password, rememberMe);
    }, 1000);
  };

  return (
    <div className={`glass-card p-6 sm:p-8 w-full mx-auto animate-fade-in ${isMobile ? 'rounded-t-2xl rounded-b-none' : 'max-w-md rounded-2xl'}`}>
      <div className="mb-4 sm:mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-wellness-dark">Welcome Back</h2>
        <p className="text-sm sm:text-base text-wellness-gray">Sign in to your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/70"
          />
        </div>
        
        <div className="space-y-1 sm:space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs sm:text-sm text-wellness-primary hover:underline">
              Forgot Password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/70"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked === true)}
          />
          <Label htmlFor="remember" className="text-xs sm:text-sm cursor-pointer">Remember me</Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-wellness-primary to-wellness-secondary hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-xs sm:text-sm text-wellness-gray">
          Don't have an account?{" "}
          <a href="#" className="text-wellness-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
