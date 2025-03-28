
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export interface Badge {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  dateEarned: string | null;
  progress: number;
}

const sampleBadges: Badge[] = [
  {
    id: 1,
    name: "Early Bird",
    description: "Complete a workout before 7 AM for 5 consecutive days",
    image: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=1740&auto=format&fit=crop",
    category: "fitness",
    dateEarned: "Apr 28, 2023",
    progress: 100
  },
  {
    id: 2,
    name: "Hydration Hero",
    description: "Drink 8 glasses of water every day for a week",
    image: "https://images.unsplash.com/photo-1594638968706-c1e7a1a7c0c1?q=80&w=1887&auto=format&fit=crop",
    category: "nutrition",
    dateEarned: "May 15, 2023",
    progress: 100
  },
  {
    id: 3,
    name: "Meditation Master",
    description: "Complete 10 meditation sessions",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1722&auto=format&fit=crop",
    category: "mindfulness",
    dateEarned: null,
    progress: 60
  },
  {
    id: 4,
    name: "Step Champion",
    description: "Reach 10,000 steps for 30 consecutive days",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop",
    category: "fitness",
    dateEarned: null,
    progress: 40
  },
  {
    id: 5,
    name: "Sleep Superstar",
    description: "Get 8 hours of sleep for 14 consecutive nights",
    image: "https://images.unsplash.com/photo-1621252179029-fe0156fff88a?q=80&w=1887&auto=format&fit=crop",
    category: "sleep",
    dateEarned: null,
    progress: 78
  },
  {
    id: 6,
    name: "Nutrition Ninja",
    description: "Log your meals for 21 consecutive days",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    category: "nutrition",
    dateEarned: "Mar 10, 2023",
    progress: 100
  }
];

export const BadgeSection = ({ limit = 0 }: { limit?: number }) => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate fetching badges data
    setTimeout(() => {
      setBadges(sampleBadges);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleShare = (badgeId: number) => {
    // This would typically open a share dialog with social media options
    toast({
      title: "Share Badge",
      description: "Share functionality would open social sharing options here",
    });
  };
  
  // Filter badges based on earned/in-progress status
  const filteredBadges = filter === "all" 
    ? badges 
    : filter === "earned" 
      ? badges.filter(badge => badge.dateEarned) 
      : badges.filter(badge => !badge.dateEarned);
  
  // Limit the number of badges if specified
  const displayBadges = limit > 0 ? filteredBadges.slice(0, limit) : filteredBadges;
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Your Achievement Badges</h2>
          {limit > 0 && (
            <Button onClick={() => navigate("/badges")}>View All Badges</Button>
          )}
        </div>
        
        {!limit && (
          <div className="flex gap-3 mb-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              className={filter === "all" ? "bg-wellness-primary" : ""}
              onClick={() => setFilter("all")}
            >
              All Badges
            </Button>
            <Button
              variant={filter === "earned" ? "default" : "outline"}
              size="sm"
              className={filter === "earned" ? "bg-wellness-success" : ""}
              onClick={() => setFilter("earned")}
            >
              Earned
            </Button>
            <Button
              variant={filter === "in-progress" ? "default" : "outline"}
              size="sm"
              className={filter === "in-progress" ? "bg-wellness-warning" : ""}
              onClick={() => setFilter("in-progress")}
            >
              In Progress
            </Button>
          </div>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].slice(0, limit || 6).map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBadges.map((badge) => (
              <div 
                key={badge.id} 
                className={`glass-card overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  badge.dateEarned ? "border-wellness-success/30" : "border-wellness-gray/30"
                }`}
              >
                <div className="relative h-40">
                  <img 
                    src={badge.image} 
                    alt={badge.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {badge.dateEarned ? (
                    <div className="absolute top-4 right-4 bg-wellness-success text-white text-xs font-medium px-3 py-1 rounded-full">
                      Earned
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-wellness-warning text-wellness-dark text-xs font-medium px-3 py-1 rounded-full">
                      In Progress
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-lg font-bold">{badge.name}</h3>
                    <div className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${
                      badge.category === "fitness" ? "bg-wellness-secondary/80 text-white" :
                      badge.category === "nutrition" ? "bg-wellness-warning/80 text-wellness-dark" :
                      badge.category === "sleep" ? "bg-wellness-primary/80 text-white" :
                      "bg-wellness-accent/80 text-wellness-dark"
                    }`}>
                      {badge.category}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-wellness-gray mb-3">{badge.description}</p>
                  
                  {!badge.dateEarned ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-wellness-gray">Progress</span>
                        <span className="font-medium text-wellness-primary">{badge.progress}%</span>
                      </div>
                      <div className="w-full bg-wellness-lightGray rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-wellness-primary h-full rounded-full"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-wellness-gray">Earned on {badge.dateEarned}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare(badge.id)}
                        className="text-xs"
                      >
                        Share
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {displayBadges.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-wellness-gray">No badges found for the selected filter.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setFilter("all")}
            >
              View All Badges
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeSection;
