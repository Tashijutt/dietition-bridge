
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";

interface ContentSection {
  heading?: string;
  paragraphs: string[];
}

interface ArticleContentProps {
  excerpt: string;
  content: ContentSection[];
  author: string;
  category: string;
}

const ArticleContent = ({ excerpt, content, author, category }: ArticleContentProps) => {
  const { ref: contentRef, inView: contentInView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1 
  });

  return (
    <div 
      ref={contentRef}
      className={cn(
        "container mx-auto px-4 max-w-4xl py-8",
        contentInView ? "animate-fade-up" : ""
      )}
    >
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">{excerpt}</p>
        {content?.map((section, index) => (
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
      
      <div className="mt-16 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">About the Author</h3>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-nutrition-100 flex items-center justify-center mr-4">
            <User className="w-6 h-6 text-nutrition-600" />
          </div>
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-sm text-gray-600">
              Professional dietitian with expertise in {category.toLowerCase()} and nutrition sciences. 
              Passionate about helping people achieve their health goals through proper diet and lifestyle changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;
