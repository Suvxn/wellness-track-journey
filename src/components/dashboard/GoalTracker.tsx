
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface GoalTrackerProps {
  userData: {
    steps: number;
    sleep: number;
    streakDays: number;
  };
  isLoading: boolean;
}

interface Goal {
  id: number;
  name: string;
  target: string;
  progress: number;
  category: string;
  deadline: string;
}

const GoalTracker: React.FC<GoalTrackerProps> = ({ userData, isLoading }) => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "Daily Step Goal",
      target: "10,000 steps",
      progress: Math.min(Math.round((userData.steps / 10000) * 100), 100),
      category: "fitness",
      deadline: "Today"
    },
    {
      id: 2,
      name: "Weekly Workout Goal",
      target: "4 workouts",
      progress: 75, // 3 out of 4 workouts
      category: "fitness",
      deadline: "3 days left"
    },
    {
      id: 3,
      name: "Meditation Practice",
      target: "10 minutes daily",
      progress: 40,
      category: "mindfulness",
      deadline: "Today"
    },
    {
      id: 4,
      name: "Water Intake",
      target: "8 glasses",
      progress: 62.5, // 5 out of 8 glasses
      category: "nutrition",
      deadline: "Today"
    },
    {
      id: 5,
      name: "Monthly Weight Goal",
      target: "Lose 2 pounds",
      progress: 50,
      category: "fitness",
      deadline: "2 weeks left"
    }
  ]);

  const handleAddGoal = () => {
    // Logic to add a new goal would go here
    console.log("Add new goal");
  };

  // Filter goals by category
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredGoals = activeFilter === "all" 
    ? goals 
    : goals.filter(goal => goal.category === activeFilter);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-wellness-dark">Current Streak</h3>
            <p className="text-wellness-gray text-sm">Keep it going!</p>
          </div>
          {isLoading ? (
            <Skeleton className="h-12 w-20" />
          ) : (
            <div className="text-4xl font-bold text-wellness-primary flex items-center">
              {userData.streakDays}
              <span className="text-base ml-1 font-normal text-wellness-gray">days</span>
            </div>
          )}
        </div>
        
        <div className="relative h-4 bg-wellness-lightGray rounded-full overflow-hidden">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <>
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-wellness-primary to-wellness-secondary"
                style={{ width: `${Math.min(userData.streakDays / 30 * 100, 100)}%` }}
              />
              {[7, 14, 21, 28].map((milestone) => (
                <div
                  key={milestone}
                  className={`absolute top-0 w-1 h-full ${
                    userData.streakDays >= milestone 
                      ? "bg-wellness-light" 
                      : "bg-wellness-gray/30"
                  }`}
                  style={{ left: `${milestone / 30 * 100}%` }}
                />
              ))}
            </>
          )}
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-wellness-gray">
          <span>Start</span>
          <span>7d</span>
          <span>14d</span>
          <span>21d</span>
          <span>28d</span>
          <span>30d</span>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-wellness-dark">Your Goals</h3>
          <Button size="sm" onClick={handleAddGoal}>Add New Goal</Button>
        </div>
        
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"} 
            size="sm"
            className={activeFilter === "all" ? "bg-wellness-primary" : ""}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={activeFilter === "fitness" ? "default" : "outline"} 
            size="sm"
            className={activeFilter === "fitness" ? "bg-wellness-secondary" : ""}
            onClick={() => setActiveFilter("fitness")}
          >
            Fitness
          </Button>
          <Button 
            variant={activeFilter === "nutrition" ? "default" : "outline"} 
            size="sm"
            className={activeFilter === "nutrition" ? "bg-wellness-warning" : ""}
            onClick={() => setActiveFilter("nutrition")}
          >
            Nutrition
          </Button>
          <Button 
            variant={activeFilter === "mindfulness" ? "default" : "outline"} 
            size="sm"
            className={activeFilter === "mindfulness" ? "bg-wellness-accent" : ""}
            onClick={() => setActiveFilter("mindfulness")}
          >
            Mindfulness
          </Button>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-24" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <div key={goal.id} className="border border-wellness-lightGray rounded-xl p-4 hover:border-wellness-primary/20 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-wellness-dark">{goal.name}</h4>
                    <p className="text-sm text-wellness-gray">Target: {goal.target}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    goal.category === "fitness" ? "bg-wellness-secondary/20 text-wellness-secondary" :
                    goal.category === "nutrition" ? "bg-wellness-warning/20 text-wellness-warning" :
                    "bg-wellness-accent/20 text-wellness-accent"
                  }`}>
                    {goal.category}
                  </span>
                </div>
                
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-wellness-gray">{goal.deadline}</span>
                    <span className={`font-medium ${
                      goal.progress >= 100 ? "text-wellness-success" :
                      goal.progress >= 60 ? "text-wellness-primary" :
                      "text-wellness-warning"
                    }`}>{goal.progress}%</span>
                  </div>
                  <Progress 
                    value={goal.progress} 
                    className="h-2"
                    style={{
                      background: goal.category === "fitness" ? "rgba(155, 135, 245, 0.2)" :
                                 goal.category === "nutrition" ? "rgba(255, 196, 61, 0.2)" :
                                 "rgba(93, 253, 203, 0.2)",
                      color: goal.category === "fitness" ? "#9B87F5" :
                             goal.category === "nutrition" ? "#FFC43D" :
                             "#5DFDCB"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
