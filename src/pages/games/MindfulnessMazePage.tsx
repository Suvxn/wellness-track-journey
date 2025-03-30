
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/common/Navbar";
import MindfulnessMazeGame from "@/components/games/MindfulnessMazeGame";

const MindfulnessMazePage = () => {
  return (
    <>
      <Helmet>
        <title>Mindfulness Maze Game | Wellness Journey</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <MindfulnessMazeGame />
        </main>
      </div>
    </>
  );
};

export default MindfulnessMazePage;
