
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "@/components/login/LoginPage";

const Index = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return <LoginPage />;
};

export default Index;
