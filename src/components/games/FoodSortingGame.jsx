
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const healthyFoods = [
  { name: "Apple", image: "🍎", type: "healthy" },
  { name: "Banana", image: "🍌", type: "healthy" },
  { name: "Broccoli", image: "🥦", type: "healthy" },
  { name: "Carrot", image: "🥕", type: "healthy" },
  { name: "Water", image: "💧", type: "healthy" },
  { name: "Grapes", image: "🍇", type: "healthy" },
  { name: "Avocado", image: "🥑", type: "healthy" },
];

const unhealthyFoods = [
  { name: "Pizza", image: "🍕", type: "unhealthy" },
  { name: "Hamburger", image: "🍔", type: "unhealthy" },
  { name: "French Fries", image: "🍟", type: "unhealthy" },
  { name: "Donut", image: "🍩", type: "unhealthy" },
  { name: "Cake", image: "🍰", type: "unhealthy" },
  { name: "Candy", image: "🍬", type: "unhealthy" },
  { name: "Soda", image: "🥤", type: "unhealthy" },
];

const FoodSortingGame = () => {
  const { toast } = useToast();
  const [foods, setFoods] = useState([]);
  const [currentFood, setCurrentFood] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  const maxAttempts = 10;
  
  const startGame = () => {
    // Combine and shuffle foods
    const allFoods = [...healthyFoods, ...unhealthyFoods].sort(() => Math.random() - 0.5);
    setFoods(allFoods);
    setCurrentFood(allFoods[0]);
    setScore(0);
    setAttempts(0);
    setGameOver(false);
    setGameStarted(true);
  };
  
  const handleSelection = (selection) => {
    if (!currentFood) return;
    
    const isCorrect = selection === currentFood.type;
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: `${currentFood.name} is ${currentFood.type}!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `${currentFood.name} is actually ${currentFood.type}!`,
        variant: "destructive",
      });
    }
    
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    if (newAttempts >= maxAttempts) {
      setGameOver(true);
      return;
    }
    
    // Move to next food
    setCurrentFood(foods[newAttempts + 1]);
  };
  
  const getScoreMessage = () => {
    const percentage = (score / maxAttempts) * 100;
    if (percentage >= 90) return "Amazing! You're a nutrition expert!";
    if (percentage >= 70) return "Great job! You know your foods well!";
    if (percentage >= 50) return "Good effort! Keep learning about nutrition!";
    return "Keep practicing! Learning about healthy foods is important!";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center mb-6 gap-4">
        <Link to="/games">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Healthy Food Sorting Game</h1>
      </div>
      
      {!gameStarted ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="text-4xl flex justify-center gap-2">
                🍎 🥦 🍔 🍩
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">How to Play</h2>
                <p className="mb-4">Sort the foods into "Healthy" or "Unhealthy" categories. You'll have {maxAttempts} foods to sort!</p>
                <Button onClick={startGame} size="lg" className="w-full md:w-auto">
                  Start Game
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : gameOver ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold">Game Over!</h2>
              <div className="text-5xl mb-4">
                {score >= 7 ? "🎉" : "👍"}
              </div>
              <p className="text-xl mb-2">Your Score: {score}/{maxAttempts}</p>
              <p className="mb-6">{getScoreMessage()}</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button onClick={startGame} variant="default">
                  Play Again
                </Button>
                <Link to="/games">
                  <Button variant="outline">
                    Back to Games
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Score: {score}</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Food {attempts + 1}/{maxAttempts}
            </div>
          </div>
          
          <Progress value={(attempts / maxAttempts) * 100} className="h-2" />
          
          <Card className="p-6 flex flex-col items-center">
            <div className="text-8xl mb-6">{currentFood?.image}</div>
            <h2 className="text-2xl font-bold mb-8">{currentFood?.name}</h2>
            
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <Button 
                onClick={() => handleSelection("healthy")} 
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                Healthy
              </Button>
              <Button 
                onClick={() => handleSelection("unhealthy")} 
                className="flex-1 bg-red-500 hover:bg-red-600"
              >
                Unhealthy
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FoodSortingGame;
