
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import BadgeSection from "@/components/badges/BadgeSection";

const BadgesPage = () => {
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Your Achievement Badges</h1>
            <p className="text-wellness-gray mb-2 text-sm sm:text-base">
              Track your progress and showcase your health and wellness accomplishments
            </p>
            <div className="text-xs sm:text-sm text-wellness-gray">
              <p>Complete challenges and maintain healthy habits to earn badges.</p>
              <p>Share your achievements on social media to inspire others!</p>
            </div>
          </div>
          
          <BadgeSection />
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
