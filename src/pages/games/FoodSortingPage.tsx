
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/common/Navbar";
import FoodSortingGame from "@/components/games/FoodSortingGame";

const FoodSortingPage = () => {
  return (
    <>
      <Helmet>
        <title>Healthy Food Sorting Game | Wellness Journey</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <FoodSortingGame />
        </main>
      </div>
    </>
  );
};

export default FoodSortingPage;
