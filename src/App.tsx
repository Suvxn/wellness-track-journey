
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import BlogPage from "./pages/BlogPage";
import BadgesPage from "./pages/BadgesPage";
import MenstrualTrackerPage from "./pages/MenstrualTrackerPage";
import GamesPage from "./pages/GamesPage";
import FoodSortingPage from "./pages/games/FoodSortingPage";
import HydrationHeroPage from "./pages/games/HydrationHeroPage";
import MindfulnessMazePage from "./pages/games/MindfulnessMazePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/badges" element={<BadgesPage />} />
          <Route path="/menstrual-tracker" element={<MenstrualTrackerPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/food-sorting" element={<FoodSortingPage />} />
          <Route path="/games/hydration-hero" element={<HydrationHeroPage />} />
          <Route path="/games/mindfulness-maze" element={<MindfulnessMazePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
