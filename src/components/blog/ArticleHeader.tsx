
import { Link } from "react-router-dom";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";

interface ArticleHeaderProps {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const ArticleHeader = ({ title, category, author, date, readTime, image }: ArticleHeaderProps) => {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <Link to="/blog" className="text-nutrition-600 hover:underline mb-8 inline-flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>
      
      <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-4">
        <span className="px-3 py-1 bg-nutrition-50 text-nutrition-700 text-sm font-medium rounded-full inline-block">
          {category}
        </span>
        
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {author}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {readTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
