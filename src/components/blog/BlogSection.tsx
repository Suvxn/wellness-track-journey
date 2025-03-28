
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCard } from "./BlogCard";
import { useNavigate } from "react-router-dom";

// Sample blog data
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Simple Habits to Improve Your Sleep Quality",
    excerpt: "Discover science-backed strategies to help you fall asleep faster and wake up feeling refreshed.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2060&auto=format&fit=crop",
    author: {
      name: "Dr. Emily Carter",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    category: "Sleep",
    date: "May 15, 2023",
    readTime: "6 min read",
    likes: 124,
    comments: 18
  },
  {
    id: 2,
    title: "The Ultimate Guide to HIIT Workouts",
    excerpt: "High-Intensity Interval Training can transform your fitness routine. Here's how to get started.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=2069&auto=format&fit=crop",
    author: {
      name: "Mark Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    category: "Fitness",
    date: "May 10, 2023",
    readTime: "8 min read",
    likes: 98,
    comments: 12
  },
  {
    id: 3,
    title: "Mindful Eating: Transforming Your Relationship with Food",
    excerpt: "Learn how being present during meals can improve digestion and help maintain a healthy weight.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Sarah Kim",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    category: "Nutrition",
    date: "May 5, 2023",
    readTime: "5 min read",
    likes: 156,
    comments: 24
  },
  {
    id: 4,
    title: "Understanding Heart Rate Zones for Better Training",
    excerpt: "Monitoring your heart rate during exercise can help you optimize your workouts for better results.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop",
    author: {
      name: "Dr. Robert Chen",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    category: "Fitness",
    date: "Apr 28, 2023",
    readTime: "7 min read",
    likes: 87,
    comments: 9
  }
];

export const BlogSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading blog posts
    setTimeout(() => {
      setPosts(blogPosts);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const categories = ["all", "fitness", "nutrition", "sleep", "mindfulness"];
  
  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === activeCategory);
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Latest Health Insights</h2>
          <Button onClick={() => navigate("/blog")}>View All Articles</Button>
        </div>
        
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className={activeCategory === category ? "bg-wellness-primary" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-96 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
