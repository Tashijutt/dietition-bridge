
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWidget from "./ChatWidget";

const ChatWidgetWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <ChatWidget onClose={() => setIsOpen(false)} />
      ) : (
        <button
          onClick={toggleWidget}
          className="fixed bottom-5 right-5 w-14 h-14 bg-indigo-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-800 transition-colors z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default ChatWidgetWrapper;
