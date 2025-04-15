
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, User, Tag, Clock, Search } from "lucide-react";
import { articles } from "@/data/blogData";
import { Link } from "react-router-dom";

const Blog = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: headingRef, inView: headingInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Nutrition", "Wellness", "Weight Loss", "Diabetes", "Heart Health", "Recipes"];
  
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-nutrition-50 to-white py-16">
          <div 
            ref={headingRef}
            className={cn(
              "container mx-auto px-4 text-center",
              headingInView ? "animate-fade-up" : "opacity-0"
            )}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Dietitian Bridge Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover evidence-based nutrition articles, diet tips, and health insights tailored for Pakistani health needs.
            </p>
            
            {/* Search Box */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full rounded-full border border-gray-300 focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category 
                      ? "bg-nutrition-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <Link 
                    to={`/blog/${article.id}`}
                    key={article.id}
                    className={cn(
                      "bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100",
                      headingInView ? "animate-fade-up" : "opacity-0"
                    )}
                    style={{ animationDelay: `${200 + index * 100}ms` }}
                  >
                    <div className="h-52 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 bg-nutrition-50 text-nutrition-700 text-xs font-medium rounded-full">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {article.date}
                        </div>
                      </div>
                      
                      <button className="mt-4 w-full text-nutrition-600 font-medium flex items-center justify-center gap-1 py-2 hover:text-nutrition-700 transition-colors">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 text-nutrition-600 hover:text-nutrition-700"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-nutrition-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Subscribe to Our Newsletter</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Get the latest nutrition tips, health advice, and exclusive content delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
              />
              <button
                className="px-6 py-3 bg-nutrition-600 text-white font-medium rounded-md hover:bg-nutrition-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
