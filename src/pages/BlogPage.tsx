
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPost } from "@/components/blog/BlogSection";
import { BlogCard } from "@/components/blog/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";

// Sample blog data (same as in the BlogSection component)
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
  },
  {
    id: 5,
    title: "5 Meditation Techniques for Beginners",
    excerpt: "Starting a meditation practice doesn't have to be complicated. Here are five simple techniques to try.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1722&auto=format&fit=crop",
    author: {
      name: "Lisa Wong",
      avatar: "https://randomuser.me/api/portraits/women/56.jpg"
    },
    category: "Mindfulness",
    date: "Apr 22, 2023",
    readTime: "4 min read",
    likes: 112,
    comments: 15
  },
  {
    id: 6,
    title: "The Science Behind Intermittent Fasting",
    excerpt: "Is intermittent fasting just a trend or does science support its benefits? We explore the research.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl. Sed euismod, nisl vel tincidunt luctus, nisl nisl aliquam nisl, nec tincidunt nisl nisl sit amet nisl.",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1974&auto=format&fit=crop",
    author: {
      name: "Dr. Michael Smith",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    category: "Nutrition",
    date: "Apr 15, 2023",
    readTime: "9 min read",
    likes: 203,
    comments: 37
  }
];

const BlogPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isLoggedIn) {
      navigate("/");
    }
    
    // Simulate loading blog posts
    setTimeout(() => {
      setPosts(blogPosts);
      setIsLoading(false);
    }, 1000);
  }, [isLoggedIn, navigate]);
  
  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }
  
  const categories = ["all", "fitness", "nutrition", "sleep", "mindfulness"];
  
  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-wellness-light">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 mb-8">
            <h1 className="text-3xl font-bold mb-2">Health & Wellness Articles</h1>
            <p className="text-wellness-gray mb-6">
              Stay informed with the latest research, tips, and insights on health, fitness, nutrition, and mindfulness
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-white/80"
              />
              
              <div className="flex gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
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
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} fullWidth />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-wellness-gray mb-4">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <Button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
