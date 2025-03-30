
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Define maze cell types
type CellType = "wall" | "path" | "start" | "end" | "player" | "mindfulness";

// Generate a simple maze - in a real app, this would be more sophisticated
const generateMaze = (width: number, height: number): CellType[][] => {
  // Start with all walls
  const maze: CellType[][] = Array(height).fill(null).map(() => Array(width).fill("wall"));
  
  // Simple maze algorithm (very basic for demo purposes)
  // In a real implementation, use a proper maze generation algorithm
  
  // Create a path from top left to bottom right
  for (let i = 0; i < height; i++) {
    maze[i][1] = "path";
  }
  
  for (let j = 1; j < width - 1; j++) {
    maze[height - 2][j] = "path";
  }
  
  // Add some random paths
  for (let i = 2; i < height - 2; i += 2) {
    for (let j = 3; j < width - 1; j += 2) {
      if (Math.random() > 0.3) {
        maze[i][j] = "path";
      }
    }
  }
  
  // Add some vertical connections
  for (let i = 3; i < height - 3; i += 2) {
    for (let j = 2; j < width - 2; j += 2) {
      if (Math.random() > 0.5) {
        maze[i][j] = "path";
        maze[i+1][j] = "path";
      }
    }
  }
  
  // Add some horizontal connections
  for (let i = 2; i < height - 2; i += 2) {
    for (let j = 3; j < width - 3; j += 2) {
      if (Math.random() > 0.3) {
        maze[i][j] = "path";
        maze[i][j+1] = "path";
      }
    }
  }
  
  // Place start, end and mindfulness spots
  maze[1][1] = "start";
  maze[height - 2][width - 2] = "end";
  
  // Add mindfulness practice spots
  let mindfulnessSpots = 0;
  const maxMindfulnessSpots = 5;
  
  while (mindfulnessSpots < maxMindfulnessSpots) {
    const randomY = Math.floor(Math.random() * (height - 2)) + 1;
    const randomX = Math.floor(Math.random() * (width - 2)) + 1;
    
    if (maze[randomY][randomX] === "path") {
      maze[randomY][randomX] = "mindfulness";
      mindfulnessSpots++;
    }
  }
  
  return maze;
};

// Mindfulness prompts
const mindfulnessPrompts = [
  "Take a deep breath in... hold... and exhale slowly.",
  "Notice how you're feeling right now. What emotions are present?",
  "Pay attention to the sounds around you for a moment.",
  "Feel your feet on the ground. Notice the sensation.",
  "Bring awareness to your posture. Adjust if needed.",
  "Focus on your breath for three cycles.",
  "Scan your body for any tension and try to release it.",
  "What's one thing you're grateful for right now?",
  "Notice the temperature of the air on your skin.",
  "Observe your thoughts without judgment for a moment."
];

const MindfulnessMazeGame = () => {
  const { toast } = useToast();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [maze, setMaze] = useState<CellType[][]>([]);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [mindfulnessCompleted, setMindfulnessCompleted] = useState(0);
  const [showMindfulness, setShowMindfulness] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [stress, setStress] = useState(50);
  const mazeWidth = 15;
  const mazeHeight = 15;
  
  const startGame = () => {
    const newMaze = generateMaze(mazeWidth, mazeHeight);
    setMaze(newMaze);
    setPlayerPosition({ x: 1, y: 1 });
    setGameStarted(true);
    setGameOver(false);
    setWon(false);
    setMindfulnessCompleted(0);
    setShowMindfulness(false);
    setStress(50);
    
    toast({
      title: "Maze Started!",
      description: "Find your way through while practicing mindfulness",
    });
  };
  
  const movePlayer = (direction: "up" | "down" | "left" | "right") => {
    if (showMindfulness || !gameStarted || gameOver) return;
    
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;
    
    switch (direction) {
      case "up":
        newY = y - 1;
        break;
      case "down":
        newY = y + 1;
        break;
      case "left":
        newX = x - 1;
        break;
      case "right":
        newX = x + 1;
        break;
    }
    
    // Check if the new position is valid
    if (
      newY >= 0 && newY < mazeHeight &&
      newX >= 0 && newX < mazeWidth
    ) {
      const cell = maze[newY][newX];
      
      if (cell === "wall") {
        // Can't move into walls
        setStress(prev => Math.min(prev + 5, 100));
        return;
      }
      
      if (cell === "end") {
        // Reached the end
        setWon(true);
        setGameOver(true);
        toast({
          title: "Congratulations!",
          description: `You've completed the maze with ${mindfulnessCompleted} mindfulness practices!`,
          variant: "default",
        });
        return;
      }
      
      if (cell === "mindfulness") {
        // Trigger mindfulness practice
        const promptIndex = Math.floor(Math.random() * mindfulnessPrompts.length);
        setCurrentPrompt(mindfulnessPrompts[promptIndex]);
        setShowMindfulness(true);
        
        // Replace this mindfulness spot with a regular path
        const newMaze = [...maze];
        newMaze[newY][newX] = "path";
        setMaze(newMaze);
      }
      
      // Move the player
      setPlayerPosition({ x: newX, y: newY });
      
      // Increase stress slightly with each move
      setStress(prev => Math.min(prev + 1, 100));
    }
  };
  
  const completeMindfulness = () => {
    setShowMindfulness(false);
    setMindfulnessCompleted(prev => prev + 1);
    setStress(prev => Math.max(prev - 15, 0));
    
    toast({
      title: "Mindfulness Practice Complete",
      description: "Your stress level has decreased!",
      variant: "default",
    });
  };
  
  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver || showMindfulness) return;
      
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          movePlayer("up");
          break;
        case "ArrowDown":
          e.preventDefault();
          movePlayer("down");
          break;
        case "ArrowLeft":
          e.preventDefault();
          movePlayer("left");
          break;
        case "ArrowRight":
          e.preventDefault();
          movePlayer("right");
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver, showMindfulness, playerPosition, maze]);
  
  // Check if stress is too high
  useEffect(() => {
    if (stress >= 100 && !gameOver) {
      setGameOver(true);
      toast({
        title: "Game Over",
        description: "Your stress level got too high!",
        variant: "destructive",
      });
    }
  }, [stress, gameOver, toast]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center mb-6 gap-4">
        <Link to="/games">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Mindfulness Maze</h1>
      </div>
      
      {!gameStarted ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="text-4xl flex justify-center gap-2">
                🧠 🧘 🌿
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-3">How to Play</h2>
                <p className="mb-4">Navigate through the maze using arrow keys or the on-screen controls. Practice mindfulness when you find lotus flowers to reduce stress.</p>
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
              <p className="font-bold">Mindfulness: {mindfulnessCompleted}</p>
            </div>
            <div>
              <p className="font-bold">Stress Level</p>
              <Progress value={stress} className="h-2 w-32" />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-2">
              {showMindfulness ? (
                <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-md text-center space-y-6">
                  <h3 className="text-xl font-semibold">Mindfulness Practice</h3>
                  <div className="text-4xl my-4">🧘</div>
                  <p className="text-lg mb-4">{currentPrompt}</p>
                  <Button onClick={completeMindfulness} size="lg">
                    I've Completed This Practice
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  {/* Render maze */}
                  <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${mazeWidth}, 1fr)` }}>
                    {maze.map((row, y) => (
                      <React.Fragment key={y}>
                        {row.map((cell, x) => {
                          let bgColor = "bg-gray-800"; // wall
                          let content = null;
                          
                          if (cell === "path") {
                            bgColor = "bg-gray-100 dark:bg-gray-700";
                          } else if (cell === "start") {
                            bgColor = "bg-green-200 dark:bg-green-800";
                            content = "🚪";
                          } else if (cell === "end") {
                            bgColor = "bg-blue-200 dark:bg-blue-800";
                            content = "🏁";
                          } else if (cell === "mindfulness") {
                            bgColor = "bg-purple-200 dark:bg-purple-800";
                            content = "🌸";
                          }
                          
                          // Player position
                          if (playerPosition.x === x && playerPosition.y === y) {
                            content = "😌";
                          }
                          
                          return (
                            <div 
                              key={x} 
                              className={`aspect-square flex items-center justify-center text-sm ${bgColor}`}
                            >
                              {content}
                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Controls for mobile */}
                  <div className="mt-4 flex justify-center items-center gap-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div></div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => movePlayer("up")}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <div></div>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => movePlayer("left")}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <div></div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => movePlayer("right")}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      
                      <div></div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => movePlayer("down")}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}
              
              {gameOver && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-4">
                  <h2 className="text-2xl font-bold mb-2">
                    {won ? "Maze Completed!" : "Game Over!"}
                  </h2>
                  <p className="text-xl mb-2">
                    {won ? "Congratulations!" : "Your stress level was too high."}
                  </p>
                  <p className="mb-4">
                    Mindfulness practices completed: {mindfulnessCompleted}
                  </p>
                  <div className="flex gap-4">
                    <Button onClick={startGame}>Play Again</Button>
                    <Link to="/games">
                      <Button variant="outline">Back to Games</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MindfulnessMazeGame;
