
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

interface HealthMetricsProps {
  userData: {
    steps: number;
    sleep: number;
    heartRate: number;
    calories: number;
    water: number;
  };
  isLoading: boolean;
}

// Weekly data for charts
const weeklyData = [
  { name: "Mon", steps: 6500, sleep: 6.8, heartRate: 72, calories: 1750, water: 6 },
  { name: "Tue", steps: 7800, sleep: 7.2, heartRate: 70, calories: 1820, water: 7 },
  { name: "Wed", steps: 9200, sleep: 7.5, heartRate: 68, calories: 1950, water: 8 },
  { name: "Thu", steps: 8100, sleep: 6.9, heartRate: 71, calories: 1870, water: 5 },
  { name: "Fri", steps: 7500, sleep: 7.0, heartRate: 69, calories: 1800, water: 6 },
  { name: "Sat", steps: 5900, sleep: 8.2, heartRate: 65, calories: 1650, water: 4 },
  { name: "Sun", steps: 8420, sleep: 7.3, heartRate: 68, calories: 1850, water: 5 }
];

const HealthMetrics: React.FC<HealthMetricsProps> = ({ userData, isLoading }) => {
  const [activeMetric, setActiveMetric] = useState("steps");
  
  // Calculate step progress percentage
  const stepGoal = 10000;
  const stepProgress = Math.min(Math.round((userData.steps / stepGoal) * 100), 100);
  
  // Calculate water progress percentage
  const waterGoal = 8;
  const waterProgress = Math.min(Math.round((userData.water / waterGoal) * 100), 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Steps Card */}
        <div 
          className={`health-metric-card cursor-pointer ${activeMetric === "steps" ? "ring-2 ring-wellness-primary" : ""}`}
          onClick={() => setActiveMetric("steps")}
        >
          {isLoading ? (
            <Skeleton className="w-full h-24" />
          ) : (
            <>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-wellness-gray">Steps</h3>
                  <p className="text-2xl font-bold text-wellness-dark">{userData.steps.toLocaleString()}</p>
                </div>
                <div className="bg-wellness-primary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wellness-primary">
                    <path d="M19 6a9 9 0 1 1-8 12.5"></path>
                    <path d="M11.5 13.5 a4.5 4.5 0 1 0 0 -9 a4.5 4.5 0 0 0 0 9Z"></path>
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-wellness-gray">Goal: {stepGoal.toLocaleString()}</span>
                  <span className="font-medium text-wellness-primary">{stepProgress}%</span>
                </div>
                <Progress value={stepProgress} className="h-2" />
              </div>
            </>
          )}
        </div>

        {/* Sleep Card */}
        <div 
          className={`health-metric-card cursor-pointer ${activeMetric === "sleep" ? "ring-2 ring-wellness-primary" : ""}`}
          onClick={() => setActiveMetric("sleep")}
        >
          {isLoading ? (
            <Skeleton className="w-full h-24" />
          ) : (
            <>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-wellness-gray">Sleep</h3>
                  <p className="text-2xl font-bold text-wellness-dark">{userData.sleep} hrs</p>
                </div>
                <div className="bg-wellness-secondary/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wellness-secondary">
                    <path d="M12 4a7.9 7.9 0 0 0-3 15.1C11 21 12 21 12 21"></path>
                    <path d="M9 10h.01"></path>
                    <path d="M15 10h.01"></path>
                    <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
                  </svg>
                </div>
              </div>
              <div className="text-xs text-wellness-gray">
                <div className="flex justify-between">
                  <span>Last night</span>
                  <span className={userData.sleep >= 7 ? "text-wellness-success" : "text-wellness-warning"}>
                    {userData.sleep >= 7 ? "Good" : "Fair"}
                  </span>
                </div>
                <div className="mt-2 flex gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                    <div 
                      key={hour}
                      className={`h-2 flex-1 rounded-sm ${hour < userData.sleep ? "bg-wellness-secondary" : "bg-wellness-gray/20"}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Heart Rate Card */}
        <div 
          className={`health-metric-card cursor-pointer ${activeMetric === "heartRate" ? "ring-2 ring-wellness-primary" : ""}`}
          onClick={() => setActiveMetric("heartRate")}
        >
          {isLoading ? (
            <Skeleton className="w-full h-24" />
          ) : (
            <>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-wellness-gray">Heart Rate</h3>
                  <p className="text-2xl font-bold text-wellness-dark">{userData.heartRate} bpm</p>
                </div>
                <div className="bg-wellness-error/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wellness-error">
                    <path d="M20.4 12.9A9 9 0 0 0 19 9l-7-7-7 7a9 9 0 0 0 6 15.5c2.4 0 5.1-.9 7-2.5"></path>
                    <path d="M16 17h6v6"></path>
                    <path d="M12 13v-3h3"></path>
                  </svg>
                </div>
              </div>
              <div className="text-xs text-wellness-gray">
                <span>Resting heart rate</span>
                <div className="flex items-center mt-2">
                  <div className="flex-1 h-2 bg-gradient-to-r from-wellness-success via-wellness-warning to-wellness-error rounded-md">
                    <div 
                      className="w-2 h-3 bg-white rounded-full border border-wellness-dark relative top-[-2px]"
                      style={{ marginLeft: `${Math.min(userData.heartRate - 40, 100)}%` }}
                    />
                  </div>
                  <span className="ml-2">Normal</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Water Card */}
        <div 
          className={`health-metric-card cursor-pointer ${activeMetric === "water" ? "ring-2 ring-wellness-primary" : ""}`}
          onClick={() => setActiveMetric("water")}
        >
          {isLoading ? (
            <Skeleton className="w-full h-24" />
          ) : (
            <>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-medium text-wellness-gray">Water</h3>
                  <p className="text-2xl font-bold text-wellness-dark">{userData.water} glasses</p>
                </div>
                <div className="bg-wellness-accent/20 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wellness-accent">
                    <path d="M12 2v5"></path>
                    <path d="M19 9 H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3Z"></path>
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-wellness-gray">Goal: {waterGoal} glasses</span>
                  <span className="font-medium text-wellness-accent">{waterProgress}%</span>
                </div>
                <Progress value={waterProgress} className="h-2 bg-wellness-lightGray [&>div]:bg-wellness-accent" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Detailed Chart */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4 text-wellness-dark">Weekly {activeMetric === "water" ? "Hydration" : activeMetric === "heartRate" ? "Heart Rate" : activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)} Trends</h3>
        
        {isLoading ? (
          <Skeleton className="w-full h-64" />
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {activeMetric === "water" ? (
                <BarChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="water" 
                    fill="#5DFDCB" 
                    radius={[4, 4, 0, 0]} 
                    name="Glasses of water"
                  />
                </BarChart>
              ) : (
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F9DA6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4F9DA6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9B87F5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#9B87F5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF476F" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF476F" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFC43D" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FFC43D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  {activeMetric === "steps" && (
                    <Area 
                      type="monotone" 
                      dataKey="steps" 
                      stroke="#4F9DA6" 
                      fillOpacity={1} 
                      fill="url(#colorSteps)" 
                      name="Steps"
                    />
                  )}
                  {activeMetric === "sleep" && (
                    <Area 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="#9B87F5" 
                      fillOpacity={1} 
                      fill="url(#colorSleep)" 
                      name="Hours of sleep"
                    />
                  )}
                  {activeMetric === "heartRate" && (
                    <Area 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke="#EF476F" 
                      fillOpacity={1} 
                      fill="url(#colorHeartRate)" 
                      name="BPM"
                    />
                  )}
                  {activeMetric === "calories" && (
                    <Area 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#FFC43D" 
                      fillOpacity={1} 
                      fill="url(#colorCalories)" 
                      name="Calories"
                    />
                  )}
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMetrics;
