
import { useState, useEffect } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenstrualSymptomLogger from "./MenstrualSymptomLogger";
import MenstrualStats from "./MenstrualStats";
import MenstrualAchievements from "./MenstrualAchievements";
import { Calendar as CalendarIcon, Droplet, Star } from "lucide-react";

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

const MenstrualTracker = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [cycleData, setCycleData] = useState<CycleData>(() => {
    const savedData = localStorage.getItem("menstrualCycleData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return {
        ...parsed,
        startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        endDate: parsed.endDate ? new Date(parsed.endDate) : null,
        predictedNextDate: parsed.predictedNextDate ? new Date(parsed.predictedNextDate) : null,
        days: parsed.days.map((day: any) => ({
          ...day,
          date: new Date(day.date),
        })),
        cycleHistory: parsed.cycleHistory.map((cycle: any) => ({
          start: new Date(cycle.start),
          end: new Date(cycle.end),
        })),
      };
    }
    return {
      startDate: null,
      endDate: null,
      days: [],
      predictedNextDate: null,
      averageCycleLength: 28,
      cycleHistory: [],
    };
  });
  
  const [points, setPoints] = useState<number>(() => {
    return Number(localStorage.getItem("menstrualTrackerPoints") || "0");
  });

  useEffect(() => {
    // Save cycle data to localStorage whenever it changes
    localStorage.setItem("menstrualCycleData", JSON.stringify(cycleData));
  }, [cycleData]);

  useEffect(() => {
    localStorage.setItem("menstrualTrackerPoints", points.toString());
  }, [points]);

  const startNewCycle = () => {
    if (selectedDate) {
      // If there was a previous cycle, add it to history
      if (cycleData.startDate && cycleData.endDate) {
        setCycleData(prev => ({
          ...prev,
          cycleHistory: [
            ...prev.cycleHistory,
            { start: prev.startDate!, end: prev.endDate! }
          ],
        }));
      }

      // Start a new cycle
      setCycleData(prev => ({
        ...prev,
        startDate: selectedDate,
        endDate: null,
        days: [
          ...prev.days,
          { date: selectedDate, flow: "medium" }
        ],
        predictedNextDate: addDays(selectedDate, prev.averageCycleLength),
      }));

      addPoints(10);
      
      toast({
        title: "Cycle Tracking Started",
        description: `Started tracking from ${format(selectedDate, "PPP")}`,
      });
    }
  };

  const endCurrentCycle = () => {
    if (selectedDate && cycleData.startDate) {
      setCycleData(prev => {
        // Calculate average cycle length based on history
        const newHistory = [
          ...prev.cycleHistory,
          { start: prev.startDate!, end: selectedDate }
        ];
        
        let totalDays = 0;
        if (newHistory.length > 1) {
          for (let i = 1; i < newHistory.length; i++) {
            totalDays += differenceInDays(
              newHistory[i].start,
              newHistory[i-1].start
            );
          }
        }
        
        const newAvgLength = newHistory.length > 1 
          ? Math.round(totalDays / (newHistory.length - 1)) 
          : prev.averageCycleLength;
        
        return {
          ...prev,
          endDate: selectedDate,
          cycleHistory: newHistory,
          averageCycleLength: newAvgLength,
          predictedNextDate: addDays(prev.startDate!, newAvgLength),
        };
      });

      addPoints(15);
      
      toast({
        title: "Cycle Ended",
        description: `Cycle ended on ${format(selectedDate, "PPP")}`,
      });
    }
  };

  const logSymptom = (symptom: string) => {
    if (selectedDate) {
      setCycleData(prev => {
        const existingDayIndex = prev.days.findIndex(
          day => format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
        );
        
        if (existingDayIndex >= 0) {
          // Update existing day
          const updatedDays = [...prev.days];
          const existingDay = updatedDays[existingDayIndex];
          
          updatedDays[existingDayIndex] = {
            ...existingDay,
            symptoms: existingDay.symptoms 
              ? [...existingDay.symptoms, symptom]
              : [symptom]
          };
          
          return { ...prev, days: updatedDays };
        } else {
          // Add new day
          return {
            ...prev,
            days: [
              ...prev.days,
              { date: selectedDate, symptoms: [symptom] }
            ]
          };
        }
      });

      addPoints(5);
      
      toast({
        title: "Symptom Logged",
        description: `Added ${symptom} for ${format(selectedDate, "MMM d")}`,
      });
    }
  };

  const addPoints = (amount: number) => {
    setPoints(prev => prev + amount);
    toast({
      title: "Points Earned!",
      description: `+${amount} points added to your wellness score`,
    });
  };

  const getDateClasses = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const cycleDay = cycleData.days.find(
      day => format(day.date, 'yyyy-MM-dd') === dateStr
    );
    
    if (!cycleDay) return "";
    
    if (cycleDay.flow === "light") {
      return "bg-pink-100 text-pink-800 rounded-md";
    } else if (cycleDay.flow === "medium") {
      return "bg-pink-300 text-pink-800 rounded-md";
    } else if (cycleDay.flow === "heavy") {
      return "bg-pink-500 text-white rounded-md";
    } else if (cycleDay.symptoms && cycleDay.symptoms.length > 0) {
      return "bg-purple-100 text-purple-800 rounded-md";
    }
    
    return "";
  };

  const setFlowIntensity = (intensity: "light" | "medium" | "heavy") => {
    if (selectedDate) {
      setCycleData(prev => {
        const existingDayIndex = prev.days.findIndex(
          day => format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
        );
        
        if (existingDayIndex >= 0) {
          // Update existing day
          const updatedDays = [...prev.days];
          updatedDays[existingDayIndex] = {
            ...updatedDays[existingDayIndex],
            flow: intensity
          };
          
          return { ...prev, days: updatedDays };
        } else {
          // Add new day
          return {
            ...prev,
            days: [
              ...prev.days,
              { date: selectedDate, flow: intensity }
            ]
          };
        }
      });

      addPoints(3);
      
      toast({
        title: "Flow Intensity Updated",
        description: `Set ${intensity} flow for ${format(selectedDate, "MMM d")}`,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-wellness-primary" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                booked: cycleData.days.map(day => day.date),
              }}
              modifiersClassNames={{
                booked: "day-booked", // Use a string class name instead of a function
              }}
              modifierStyles={{
                booked: (date) => {
                  // Apply inline styles using the function
                  const dateStr = format(date, 'yyyy-MM-dd');
                  const cycleDay = cycleData.days.find(
                    day => format(day.date, 'yyyy-MM-dd') === dateStr
                  );
                  
                  if (!cycleDay) return {};
                  
                  if (cycleDay.flow === "light") {
                    return { backgroundColor: "#fee2e2", color: "#991b1b", borderRadius: "0.375rem" };
                  } else if (cycleDay.flow === "medium") {
                    return { backgroundColor: "#fca5a5", color: "#991b1b", borderRadius: "0.375rem" };
                  } else if (cycleDay.flow === "heavy") {
                    return { backgroundColor: "#ef4444", color: "#ffffff", borderRadius: "0.375rem" };
                  } else if (cycleDay.symptoms && cycleDay.symptoms.length > 0) {
                    return { backgroundColor: "#e0e7ff", color: "#4338ca", borderRadius: "0.375rem" };
                  }
                  
                  return {};
                }
              }}
              footer={
                <div className="mt-4 flex flex-col gap-2">
                  <div className="text-sm text-center mb-2">
                    {cycleData.startDate && (
                      <p>Current cycle started: {format(cycleData.startDate, "MMM d")}</p>
                    )}
                    {cycleData.predictedNextDate && (
                      <p>Next cycle predicted: {format(cycleData.predictedNextDate, "MMM d")}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={startNewCycle}
                      className="w-1/2"
                    >
                      Start Cycle
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={endCurrentCycle}
                      className="w-1/2" 
                      disabled={!cycleData.startDate}
                    >
                      End Cycle
                    </Button>
                  </div>
                </div>
              }
            />
            
            {selectedDate && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Flow Intensity</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFlowIntensity("light")}
                    className="flex gap-1 items-center"
                  >
                    <Droplet className="h-4 w-4 text-pink-300" />
                    Light
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFlowIntensity("medium")}
                    className="flex gap-1 items-center"
                  >
                    <Droplet className="h-4 w-4 text-pink-500" />
                    Medium
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFlowIntensity("heavy")}
                    className="flex gap-1 items-center"
                  >
                    <Droplet className="h-4 w-4 text-pink-700" />
                    Heavy
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-wellness-secondary" />
              Points & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-md">Your Points:</span>
              <span className="text-2xl font-bold text-wellness-secondary">{points}</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-wellness-gray">Earn points by:</p>
              <ul className="text-sm list-disc pl-5 text-wellness-gray">
                <li>Starting a cycle (+10 pts)</li>
                <li>Ending a cycle (+15 pts)</li>
                <li>Logging symptoms (+5 pts)</li>
                <li>Setting flow intensity (+3 pts)</li>
                <li>Completing a streak (+20 pts)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Tabs defaultValue="symptoms" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="stats">Cycle Stats</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="symptoms">
            <MenstrualSymptomLogger 
              selectedDate={selectedDate}
              onLogSymptom={logSymptom}
            />
          </TabsContent>
          <TabsContent value="stats">
            <MenstrualStats cycleData={cycleData} />
          </TabsContent>
          <TabsContent value="achievements">
            <MenstrualAchievements points={points} cycleData={cycleData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MenstrualTracker;
