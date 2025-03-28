
import { useState, useEffect } from "react";
import HealthMetrics from "./HealthMetrics";
import GoalTracker from "./GoalTracker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "Jane",
    steps: 8420,
    sleep: 7.3,
    heartRate: 68,
    calories: 1850,
    water: 5,
    streakDays: 15,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back, Jane!",
        description: "Your health metrics are updated for today.",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  const recentActivities = [
    { id: 1, type: "Steps", value: "2,500 steps", time: "1 hour ago" },
    { id: 2, type: "Water", value: "300ml", time: "2 hours ago" },
    { id: 3, type: "Sleep", value: "7.3 hours", time: "Today" },
    { id: 4, type: "Meditation", value: "15 minutes", time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-wellness-light pt-20 pb-12">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-wellness-dark">
            Good Morning, {userData.name}
          </h1>
          <p className="text-wellness-gray">
            Here's your health overview for today
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="metrics" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
                <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
              </TabsList>
              <TabsContent value="metrics" className="mt-4">
                <HealthMetrics userData={userData} isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="goals" className="mt-4">
                <GoalTracker userData={userData} isLoading={isLoading} />
              </TabsContent>
            </Tabs>

            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 text-wellness-dark">
                Recommended for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-wellness-primary/10 p-4 rounded-xl">
                  <h3 className="font-medium text-wellness-primary mb-2">
                    Afternoon Meditation
                  </h3>
                  <p className="text-sm text-wellness-gray">
                    10-minute guided meditation to reduce stress
                  </p>
                </div>
                <div className="bg-wellness-secondary/10 p-4 rounded-xl">
                  <h3 className="font-medium text-wellness-secondary mb-2">
                    Hydration Reminder
                  </h3>
                  <p className="text-sm text-wellness-gray">
                    Try to drink 2 more glasses of water today
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 text-wellness-dark">
                Activity Feed
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-wellness-accent/20 flex items-center justify-center text-wellness-primary">
                      {activity.type === "Steps" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 6a9 9 0 1 1-8 12.5"></path>
                          <path d="M11.5 13.5 a4.5 4.5 0 1 0 0 -9 a4.5 4.5 0 0 0 0 9Z"></path>
                        </svg>
                      )}
                      {activity.type === "Water" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2v5"></path>
                          <path d="M19 9 H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3Z"></path>
                        </svg>
                      )}
                      {activity.type === "Sleep" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 4a7.9 7.9 0 0 0-3 15.1C11 21 12 21 12 21"></path>
                          <path d="M9 10h.01"></path>
                          <path d="M15 10h.01"></path>
                          <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
                        </svg>
                      )}
                      {activity.type === "Meditation" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                          <path d="M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                          <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                          <path d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-wellness-dark">
                        {activity.value} {activity.type}
                      </p>
                      <p className="text-xs text-wellness-gray">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4 text-wellness-dark">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-wellness-primary p-3 rounded-xl text-white text-sm font-medium hover:bg-wellness-primary/90 transition-colors">
                  Log Water
                </button>
                <button className="bg-wellness-secondary p-3 rounded-xl text-white text-sm font-medium hover:bg-wellness-secondary/90 transition-colors">
                  Log Meal
                </button>
                <button className="bg-wellness-accent p-3 rounded-xl text-wellness-dark text-sm font-medium hover:bg-wellness-accent/90 transition-colors">
                  Log Exercise
                </button>
                <button className="bg-wellness-dark p-3 rounded-xl text-white text-sm font-medium hover:bg-wellness-dark/90 transition-colors">
                  Log Sleep
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
