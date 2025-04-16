
import { BookOpen, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
}

interface SimilarArticlesProps {
  articles: Article[];
}

const SimilarArticles = ({ articles }: SimilarArticlesProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-2xl font-bold mb-8 flex items-center">
          <BookOpen className="mr-2 h-6 w-6 text-nutrition-600" />
          Similar Articles You Might Enjoy
        </h2>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card 
                key={article.id}
                className="bg-white hover:shadow-md transition-all border border-gray-100 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/blog/${article.id}`)}
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-nutrition-50 text-nutrition-700 text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="font-bold line-clamp-2 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                  <div 
                    className="mt-3 text-nutrition-600 text-sm font-medium flex items-center hover:text-nutrition-700"
                  >
                    Read Article <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                  </div>
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
  );
};

export default SimilarArticles;
