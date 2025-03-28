
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Dashboard from "@/components/dashboard/Dashboard";
import BlogSection from "@/components/blog/BlogSection";
import BadgeSection from "@/components/badges/BadgeSection";

const DashboardPage = () => {
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
      <Dashboard />
      
      <div className="bg-white py-10">
        <BlogSection />
      </div>
      
      <div className="py-10">
        <BadgeSection limit={3} />
      </div>
    </div>
  );
};

export default DashboardPage;
