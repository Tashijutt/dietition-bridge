
import { useParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { articles } from "@/data/blogData";
import { ArrowLeft } from "lucide-react";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleContent from "@/components/blog/ArticleContent";
import SimilarArticles from "@/components/blog/SimilarArticles";

const BlogPost = () => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  
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
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : ''}`}>
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <ArticleHeader 
          title={article.title}
          category={article.category}
          author={article.author}
          date={article.date}
          readTime={article.readTime}
          image={article.image}
        />

        <ArticleContent 
          excerpt={article.excerpt}
          content={article.content}
          author={article.author}
          category={article.category}
        />
        
        <SimilarArticles articles={similarArticles} />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
