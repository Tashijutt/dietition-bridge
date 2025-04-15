
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "@/data/blogData";

const BlogPost = () => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const article = articles.find(article => article.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold">Blog post not found</h1>
          <Link to="/blog" className="text-primary hover:underline mt-4 inline-flex items-center">
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
      <main className="flex-grow pt-24">
        {/* Article Header */}
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="text-primary hover:underline mb-8 inline-flex items-center">
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
            <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {article.date}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 max-w-4xl py-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
            {/* Add more content here based on your needs */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p>This is a detailed blog post about {article.title}. The content here would be expanded based on the specific article.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
