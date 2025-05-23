
import { useState, useEffect } from "react";
import { LoginForm } from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Health and wellness carousel images
const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1887&auto=format&fit=crop",
    alt: "Person meditating on a mountain at sunrise",
    title: "Find Your Inner Peace",
    subtitle: "Track meditation sessions and mindfulness practices"
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop",
    alt: "Healthy food on a wooden table",
    title: "Nourish Your Body",
    subtitle: "Log and monitor your nutrition habits"
  },
  {
    url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1974&auto=format&fit=crop",
    alt: "Person running on a track",
    title: "Achieve Your Fitness Goals",
    subtitle: "Set targets and track your progress"
  },
  {
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1740&auto=format&fit=crop",
    alt: "Healthy meal prep containers",
    title: "Plan for Success",
    subtitle: "Organize your meals and workout schedule"
  },
  {
    url: "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=1932&auto=format&fit=crop",
    alt: "Someone exercising with a fitness tracker",
    title: "Monitor Your Health",
    subtitle: "Track vital metrics and health indicators"
  }
];

export const LoginPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Function to handle login (simulated)
  const handleLogin = (email: string, password: string, rememberMe: boolean) => {
    console.log("Login attempted with:", { email, password, rememberMe });
    // Simulate successful login and redirect to dashboard
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Navigate to next/previous slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Carousel */}
      <div className="h-full w-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={image.url}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-20 left-5 md:left-10 z-20 text-white max-w-md lg:left-20">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 animate-slide-up">
                {image.title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl animate-slide-up animation-delay-150">
                {image.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel navigation buttons - hidden on small mobile devices */}
      <button onClick={prevSlide} className="carousel-button left-2 md:left-5 hidden sm:flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={nextSlide} className="carousel-button right-2 md:right-5 hidden sm:flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Login form overlay */}
      <div className={`
        absolute z-30 w-full px-4 
        ${isMobile 
          ? "inset-x-0 bottom-0 pb-10 pt-5" 
          : "right-5 md:right-10 top-1/2 transform -translate-y-1/2 max-w-md"}
      `}>
        <LoginForm onLogin={handleLogin} />
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6 md:w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Brand name */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-20">
        <h1 className="text-white text-2xl md:text-3xl font-bold">WellnessTrack</h1>
      </div>
    </div>
  );
};

export default LoginPage;
