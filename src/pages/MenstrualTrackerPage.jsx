
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import MenstrualTracker from "@/components/menstrual/MenstrualTracker";

const MenstrualTrackerPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-wellness-light">
      <Navbar />
      <div className="pt-20 pb-8 sm:pt-24 sm:pb-12">
        <div className="container mx-auto px-4">
          <div className="glass-card p-5 sm:p-8 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Menstrual Cycle Tracker</h1>
            <p className="text-wellness-gray mb-2 text-sm sm:text-base">
              Track your menstrual cycle and earn wellness points
            </p>
            <div className="text-xs sm:text-sm text-wellness-gray">
              <p>Log your symptoms, track your period, and predict your next cycle.</p>
              <p>Earn badges for consistent tracking and completing challenges!</p>
            </div>
          </div>
          
          <MenstrualTracker />
        </div>
      </div>
    </div>
  );
};

export default MenstrualTrackerPage;
