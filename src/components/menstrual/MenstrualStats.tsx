
import { useMemo } from "react";
import { format, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

type MenstrualStatsProps = {
  cycleData: CycleData;
};

const MenstrualStats = ({ cycleData }: MenstrualStatsProps) => {
  const currentCycleDuration = useMemo(() => {
    if (!cycleData.startDate) return 0;
    
    const endDate = cycleData.endDate || new Date();
    return differenceInDays(endDate, cycleData.startDate) + 1;
  }, [cycleData.startDate, cycleData.endDate]);
  
  const cycleLengthData = useMemo(() => {
    return cycleData.cycleHistory.map((cycle, index) => {
      const cycleLength = differenceInDays(cycle.end, cycle.start) + 1;
      return {
        cycle: `Cycle ${index + 1}`,
        days: cycleLength,
        average: cycleData.averageCycleLength,
      };
    });
  }, [cycleData.cycleHistory, cycleData.averageCycleLength]);
  
  const symptomFrequency = useMemo(() => {
    const symptoms: Record<string, number> = {};
    
    cycleData.days.forEach(day => {
      if (day.symptoms) {
        day.symptoms.forEach(symptom => {
          if (!symptom.startsWith("Notes added:")) { // Skip notes entries
            symptoms[symptom] = (symptoms[symptom] || 0) + 1;
          }
        });
      }
    });
    
    return Object.entries(symptoms)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 symptoms
  }, [cycleData.days]);

  const flowIntensityData = useMemo(() => {
    // Group by flow intensity
    const flowDays = {
      light: 0,
      medium: 0,
      heavy: 0,
    };
    
    cycleData.days.forEach(day => {
      if (day.flow) {
        flowDays[day.flow]++;
      }
    });
    
    return [
      { name: 'Light', value: flowDays.light },
      { name: 'Medium', value: flowDays.medium },
      { name: 'Heavy', value: flowDays.heavy },
    ];
  }, [cycleData.days]);

  if (cycleData.cycleHistory.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-wellness-gray">
            Start tracking your cycle to see your personalized statistics.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Cycle Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cycleData.averageCycleLength} days</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Cycle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentCycleDuration} days</div>
            {cycleData.startDate && (
              <p className="text-xs text-wellness-gray">
                Started {format(cycleData.startDate, "MMM d")}
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Period</CardTitle>
          </CardHeader>
          <CardContent>
            {cycleData.predictedNextDate ? (
              <>
                <div className="text-2xl font-bold">{format(cycleData.predictedNextDate, "MMM d")}</div>
                <p className="text-xs text-wellness-gray">
                  In {differenceInDays(cycleData.predictedNextDate, new Date())} days
                </p>
              </>
            ) : (
              <div className="text-md">Not enough data</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cycle Length History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            {cycleLengthData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={cycleLengthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="cycle" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="days" 
                    stroke="#4F9DA6" 
                    fill="#4F9DA6" 
                    fillOpacity={0.3} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="average" 
                    stroke="#9B87F5" 
                    fill="#9B87F5"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-wellness-gray">
                Not enough data to display chart
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            {symptomFrequency.length > 0 ? (
              <ul className="space-y-2">
                {symptomFrequency.map((symptom) => (
                  <li key={symptom.name} className="flex justify-between items-center">
                    <span>{symptom.name}</span>
                    <span className="text-wellness-gray bg-wellness-light px-2 py-1 rounded-full text-xs">
                      {symptom.count} {symptom.count === 1 ? 'time' : 'times'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-wellness-gray">No symptoms logged yet</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Flow Intensity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {flowIntensityData.some(d => d.value > 0) ? (
              <div className="space-y-3">
                {flowIntensityData.map((flow) => (
                  <div key={flow.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{flow.name}</span>
                      <span>{flow.value} days</span>
                    </div>
                    <div className="h-2 bg-wellness-light rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          flow.name === 'Light' ? 'bg-pink-300' : 
                          flow.name === 'Medium' ? 'bg-pink-500' : 'bg-pink-700'
                        }`}
                        style={{ 
                          width: `${Math.min(100, (flow.value / Math.max(...flowIntensityData.map(d => d.value))) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-wellness-gray">No flow data logged yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MenstrualStats;
