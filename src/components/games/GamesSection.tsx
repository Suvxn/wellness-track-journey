
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Droplets, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const GamesSection = () => {
  const games = [
    {
      id: "food-sorting",
      title: "Healthy Food Sorting Game",
      description: "Sort foods into healthy and unhealthy categories to learn about nutrition.",
      icon: <Apple className="h-10 w-10 text-green-500" />,
      path: "/games/food-sorting"
    },
    {
      id: "hydration-hero",
      title: "Hydration Hero",
      description: "Help keep your character hydrated by collecting water drops and avoiding dehydration!",
      icon: <Droplets className="h-10 w-10 text-blue-500" />,
      path: "/games/hydration-hero"
    },
    {
      id: "mindfulness-maze",
      title: "Mindfulness Maze",
      description: "Navigate through the maze while practicing mindfulness techniques.",
      icon: <Brain className="h-10 w-10 text-purple-500" />,
      path: "/games/mindfulness-maze"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <Card key={game.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center gap-4">
            {game.icon}
            <div>
              <CardTitle>{game.title}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Link to={game.path}>
              <Button className="w-full">Play Now</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GamesSection;
