
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type CycleDay = {
  date: Date;
  flow?: "light" | "medium" | "heavy" | null;
  symptoms?: string[];
  notes?: string;
};

type CycleData = {
  startDate: Date | null;
  endDate: Date | null;
  days: CycleDay[];
  predictedNextDate: Date | null;
  averageCycleLength: number;
  cycleHistory: { start: Date; end: Date }[];
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredPoints: number;
  progress: number;
  completed: boolean;
};

type MenstrualAchievementsProps = {
  points: number;
  cycleData: CycleData;
};

const MenstrualAchievements = ({ points, cycleData }: MenstrualAchievementsProps) => {
  const achievements = useMemo((): Achievement[] => {
    // Calculate various stats for achievements
    const cyclesTracked = cycleData.cycleHistory.length;
    const daysLogged = cycleData.days.length;
    const symptomsLogged = cycleData.days.reduce((count, day) => {
      return count + (day.symptoms?.length || 0);
    }, 0);
    
    return [
      {
        id: "first-cycle",
        title: "Cycle Starter",
        description: "Track your first complete menstrual cycle",
        icon: "🌱",
        requiredPoints: 25,
        progress: Math.min(100, (cyclesTracked / 1) * 100),
        completed: cyclesTracked >= 1,
      },
      {
        id: "cycle-streak",
        title: "Consistent Tracker",
        description: "Track 3 consecutive cycles",
        icon: "📊",
        requiredPoints: 75,
        progress: Math.min(100, (cyclesTracked / 3) * 100),
        completed: cyclesTracked >= 3,
      },
      {
        id: "symptom-logger",
        title: "Symptom Sleuth",
        description: "Log 20 different symptoms",
        icon: "🔍",
        requiredPoints: 50,
        progress: Math.min(100, (symptomsLogged / 20) * 100),
        completed: symptomsLogged >= 20,
      },
      {
        id: "data-queen",
        title: "Data Queen",
        description: "Log data for 30 days",
        icon: "👑",
        requiredPoints: 100,
        progress: Math.min(100, (daysLogged / 30) * 100),
        completed: daysLogged >= 30,
      },
      {
        id: "wellness-warrior",
        title: "Wellness Warrior",
        description: "Earn 200 points",
        icon: "⚔️",
        requiredPoints: 200,
        progress: Math.min(100, (points / 200) * 100),
        completed: points >= 200,
      },
      {
        id: "cycle-master",
        title: "Cycle Master",
        description: "Track 6 complete cycles",
        icon: "🔮",
        requiredPoints: 150,
        progress: Math.min(100, (cyclesTracked / 6) * 100),
        completed: cyclesTracked >= 6,
      },
    ];
  }, [cycleData, points]);

  const completedAchievements = achievements.filter(a => a.completed);
  const nextAchievements = achievements.filter(a => !a.completed).sort((a, b) => a.progress > b.progress ? -1 : 1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-md">Total Points:</span>
            <span className="text-xl font-bold text-wellness-secondary">{points}</span>
          </div>
          <div className="space-y-2">
            <Progress value={(completedAchievements.length / achievements.length) * 100} className="h-2" />
            <p className="text-sm text-wellness-gray text-center">
              {completedAchievements.length} of {achievements.length} achievements unlocked
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {completedAchievements.length > 0 && (
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Unlocked Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {completedAchievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="bg-wellness-light border border-wellness-primary rounded-lg p-4 flex flex-col items-center text-center animate-pulse-scale"
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-bold text-wellness-dark">{achievement.title}</h3>
                    <p className="text-sm text-wellness-gray">{achievement.description}</p>
                    <div className="mt-2 text-xs font-medium text-wellness-primary">
                      +{achievement.requiredPoints} points
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Achievements to Unlock</CardTitle>
          </CardHeader>
          <CardContent>
            {nextAchievements.length > 0 ? (
              <div className="space-y-6">
                {nextAchievements.map((achievement) => (
                  <div key={achievement.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl opacity-50">{achievement.icon}</div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-wellness-gray">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{Math.round(achievement.progress)}% complete</span>
                        <span>+{achievement.requiredPoints} points</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-wellness-gray">
                Congratulations! You've unlocked all available achievements.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenstrualAchievements;
