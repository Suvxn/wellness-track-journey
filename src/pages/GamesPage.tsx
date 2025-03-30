
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/common/Navbar";
import GamesSection from "@/components/games/GamesSection";

const GamesPage = () => {
  return (
    <>
      <Helmet>
        <title>Wellness Games | Wellness Journey</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Wellness Games</h1>
          <GamesSection />
        </main>
      </div>
    </>
  );
};

export default GamesPage;
