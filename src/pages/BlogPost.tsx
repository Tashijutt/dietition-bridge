
import { useParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";
import { Calendar, User, ArrowLeft, Clock, Tag, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "@/data/blogData";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: contentRef, inView: contentInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Find the current article based on ID
  const article = articles.find(article => article.id === Number(id));

  // Reset scroll position when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find similar articles based on category
  const similarArticles = useMemo(() => {
    if (!article) return [];
    
    return articles
      .filter(a => a.id !== article.id && a.category === article.category)
      .slice(0, 3);
  }, [article, id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
          <Link to="/blog" className="text-nutrition-600 hover:underline mt-4 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      <main className="flex-grow pt-24 pb-16">
        {/* Article Header */}
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="text-nutrition-600 hover:underline mb-8 inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="px-3 py-1 bg-nutrition-50 text-nutrition-700 text-sm font-medium rounded-full inline-block">
              {article.category}
            </span>
            
            <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          ref={contentRef}
          className={cn(
            "container mx-auto px-4 max-w-4xl py-8",
            contentInView ? "animate-fade-up" : "opacity-0"
          )}
        >
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>
            {article.content?.map((section, index) => (
              <div key={index} className="mb-10">
                {section.heading && (
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                )}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-5 text-gray-700 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
          
          {/* Author Bio */}
          <div className="mt-16 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-nutrition-100 flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-nutrition-600" />
              </div>
              <div>
                <h4 className="font-medium">{article.author}</h4>
                <p className="text-sm text-gray-600">
                  Professional dietitian with expertise in {article.category.toLowerCase()} and nutrition sciences. 
                  Passionate about helping people achieve their health goals through proper diet and lifestyle changes.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Articles Section */}
        <div className="bg-gray-50 py-12 mt-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <BookOpen className="mr-2 h-6 w-6 text-nutrition-600" />
              Similar Articles You Might Enjoy
            </h2>
            
            {similarArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarArticles.map((similarArticle) => (
                  <Card 
                    key={similarArticle.id}
                    className="bg-white hover:shadow-md transition-all border border-gray-100 overflow-hidden cursor-pointer"
                  >
                    <div className="h-40 overflow-hidden" onClick={() => navigate(`/blog/${similarArticle.id}`)}>
                      <img 
                        src={similarArticle.image} 
                        alt={similarArticle.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-nutrition-50 text-nutrition-700 text-xs font-medium rounded-full">
                          {similarArticle.category}
                        </span>
                        <span className="text-xs text-gray-500">{similarArticle.readTime}</span>
                      </div>
                      <h3 className="font-bold line-clamp-2 mb-2">{similarArticle.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{similarArticle.excerpt}</p>
                      <Link 
                        to={`/blog/${similarArticle.id}`}
                        className="mt-3 text-nutrition-600 text-sm font-medium flex items-center hover:text-nutrition-700"
                      >
                        Read Article <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-100">
                <p>No similar articles found</p>
                <Link 
                  to="/blog"
                  className="mt-3 text-nutrition-600 font-medium inline-flex items-center hover:text-nutrition-700"
                >
                  Browse all articles <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
