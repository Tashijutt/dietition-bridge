
import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatWidget from './ChatWidget';

const ChatWidgetWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-soft w-full sm:w-96 h-[500px] flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-primary text-white p-4 flex justify-between items-center sticky top-0 z-10">
            <h3 className="font-semibold">Chat with Nutritionist AI</h3>
            <button onClick={toggleWidget} className="text-white hover:text-secondary transition-colors">
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
          className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatWidgetWrapper;
