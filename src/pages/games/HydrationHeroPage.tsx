
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/common/Navbar";
import HydrationHeroGame from "@/components/games/HydrationHeroGame";

const HydrationHeroPage = () => {
  return (
    <>
      <Helmet>
        <title>Hydration Hero Game | Wellness Journey</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <HydrationHeroGame />
        </main>
      </div>
    </>
  );
};

export default HydrationHeroPage;
