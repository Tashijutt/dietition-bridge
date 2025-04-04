
import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

const ChatWidgetWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleWidget = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (isOpen) {
      // Adding a delay before closing to allow animation
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsOpen(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  // Close chat when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggleWidget();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 h-[500px] flex flex-col overflow-hidden border border-gray-200 animate-fade-in">
          <div className="bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
            <h3 className="font-semibold">Chat with Nutritionist AI</h3>
            <button 
              onClick={toggleWidget} 
              className="text-white hover:text-secondary transition-colors focus:outline-none"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatWidget />
          </div>
        </div>
      ) : (
        <button
          onClick={toggleWidget}
          className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
          aria-label="Chat with nutritionist"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </button>
      )}
    </div>
  );
};

export default ChatWidgetWrapper;
