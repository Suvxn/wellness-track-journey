
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HydrationHeroGame = () => {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [hydrationLevel, setHydrationLevel] = useState(100);
  const [playerPosition, setPlayerPosition] = useState({ x: 50, y: 80 });
  const [waterDrops, setWaterDrops] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [unhealthyItems, setUnhealthyItems] = useState<Array<{id: number, x: number, y: number, type: string}>>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastDropTime = useRef(0);
  const lastUnhealthyTime = useRef(0);
  
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setHydrationLevel(100);
    setPlayerPosition({ x: 50, y: 80 });
    setWaterDrops([]);
    setUnhealthyItems([]);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    lastDropTime.current = Date.now();
    lastUnhealthyTime.current = Date.now();
    
    gameLoop();
    
    toast({
      title: "Game Started!",
      description: "Collect water drops to stay hydrated!",
    });
  };
  
  const movePlayer = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!gameStarted || gameOver || !gameAreaRef.current) return;
    
    const gameArea = gameAreaRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    
    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = ((clientX - gameArea.left) / gameArea.width) * 100;
    const y = ((clientY - gameArea.top) / gameArea.height) * 100;
    
    setPlayerPosition({
      x: Math.min(Math.max(x, 5), 95),
      y: Math.min(Math.max(y, 5), 95),
    });
  }, [gameStarted, gameOver]);
  
  const gameLoop = useCallback(() => {
    // Decrease hydration over time
    setHydrationLevel(prev => {
      const newLevel = Math.max(prev - 0.2, 0);
      if (newLevel <= 0 && !gameOver) {
        setGameOver(true);
        toast({
          title: "Game Over!",
          description: "You're dehydrated! Final score: " + score,
          variant: "destructive",
        });
      }
      return newLevel;
    });
    
    // Add new water drops occasionally
    const now = Date.now();
    if (now - lastDropTime.current > 1500) {
      setWaterDrops(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        y: 0
      }]);
      lastDropTime.current = now;
    }
    
    // Add unhealthy items
    if (now - lastUnhealthyTime.current > 2500) {
      const types = ["soda", "coffee"];
      setUnhealthyItems(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        y: 0,
        type: types[Math.floor(Math.random() * types.length)]
      }]);
      lastUnhealthyTime.current = now;
    }
    
    // Move drops and unhealthy items down
    setWaterDrops(prev => prev.map(drop => ({
      ...drop,
      y: drop.y + 1
    })).filter(drop => drop.y < 100));
    
    setUnhealthyItems(prev => prev.map(item => ({
      ...item,
      y: item.y + 0.8
    })).filter(item => item.y < 100));
    
    // Check for collisions
    const playerRadius = 5;
    const itemRadius = 3;
    
    setWaterDrops(prev => prev.filter(drop => {
      const distance = Math.sqrt(
        Math.pow(playerPosition.x - drop.x, 2) + 
        Math.pow(playerPosition.y - drop.y, 2)
      );
      
      if (distance < playerRadius + itemRadius) {
        // Collected water drop
        setScore(s => s + 10);
        setHydrationLevel(h => Math.min(h + 5, 100));
        toast({
          title: "+10 points",
          description: "Hydration increased!",
          variant: "default",
        });
        return false;
      }
      return true;
    }));
    
    setUnhealthyItems(prev => prev.filter(item => {
      const distance = Math.sqrt(
        Math.pow(playerPosition.x - item.x, 2) + 
        Math.pow(playerPosition.y - item.y, 2)
      );
      
      if (distance < playerRadius + itemRadius) {
        // Collected unhealthy item
        setHydrationLevel(h => Math.max(h - 15, 0));
        toast({
          title: "Oops!",
          description: `${item.type === "soda" ? "Soda" : "Coffee"} decreases hydration!`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    }));
    
    if (!gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameOver, playerPosition, score, toast]);
  
  useEffect(() => {
    if (gameStarted && !gameOver) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameStarted, gameOver, gameLoop]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center mb-6 gap-4">
        <Link to="/games">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Hydration Hero</h1>
      </div>
      
      {!gameStarted ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="text-4xl flex justify-center gap-2">
                💧 🏃 🥤
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">How to Play</h2>
                <p className="mb-4">Move your character by clicking or touching the game area. Collect water drops to stay hydrated and avoid unhealthy drinks!</p>
                <Button onClick={startGame} size="lg" className="w-full md:w-auto">
                  Start Game
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold">Score: {score}</p>
            </div>
            <div>
              <p className="font-bold">Hydration</p>
              <Progress value={hydrationLevel} className="h-2 w-32" />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-2">
              <div 
                ref={gameAreaRef}
                className="w-full h-[400px] bg-blue-50 dark:bg-blue-950 relative rounded-md overflow-hidden"
                onMouseMove={movePlayer}
                onTouchMove={movePlayer}
              >
                {/* Player */}
                <div 
                  className="absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 transition-transform"
                  style={{
                    left: `${playerPosition.x}%`,
                    top: `${playerPosition.y}%`,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="text-2xl">🏃</div>
                  </div>
                </div>
                
                {/* Water drops */}
                {waterDrops.map(drop => (
                  <div
                    key={drop.id}
                    className="absolute text-xl transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${drop.x}%`,
                      top: `${drop.y}%`,
                    }}
                  >
                    💧
                  </div>
                ))}
                
                {/* Unhealthy items */}
                {unhealthyItems.map(item => (
                  <div
                    key={item.id}
                    className="absolute text-xl transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                    }}
                  >
                    {item.type === "soda" ? "🥤" : "☕"}
                  </div>
                ))}
                
                {gameOver && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
                    <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
                    <p className="text-xl mb-4">Your Score: {score}</p>
                    <div className="flex gap-4">
                      <Button onClick={startGame}>Play Again</Button>
                      <Link to="/games">
                        <Button variant="outline">Back to Games</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HydrationHeroGame;
