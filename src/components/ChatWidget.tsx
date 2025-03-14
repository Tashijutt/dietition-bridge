
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize, Maximize, Robot } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAIResponse } from "@/services/ai";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([
    {
      type: 'bot',
      content: 'Hello! I\'m your NutriCare AI assistant. I can answer questions about nutrition, diet plans, or help you find a dietitian. How can I help you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Scroll to bottom on new messages
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // Focus input field when widget opens
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = message.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setMessage("");
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await getAIResponse(userMessage);
      
      // Add bot response
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I'm having trouble processing your request. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-nutrition-600 text-white rounded-full shadow-lg hover:bg-nutrition-700 transition-all duration-300 hover:scale-105 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-3 px-3 py-1 bg-white text-nutrition-600 text-sm font-medium rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Chat with NutriAI</span>
        </button>
      )}
      
      {/* Chat Widget Panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-200",
            isMinimized ? "h-14" : "h-[550px] max-h-[80vh]",
            isOpen ? "animate-slide-up" : ""
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-nutrition-600 text-white">
            <div className="flex items-center gap-2">
              <Robot className="w-5 h-5" />
              <h3 className="font-medium">NutriCare AI Assistant</h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleMinimize}
                className="p-1.5 rounded-full hover:bg-nutrition-500 transition-colors"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
              </button>
              <button
                onClick={handleToggle}
                className="p-1.5 rounded-full hover:bg-nutrition-500 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto h-[calc(550px-130px)]">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={cn(
                        "chat-message",
                        msg.type === 'user' ? "chat-message-user" : "chat-message-bot"
                      )}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="chat-message chat-message-bot flex space-x-2">
                      <span className="animate-pulse">•</span>
                      <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>•</span>
                      <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>•</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about nutrition, diets, or health..."
                    className="chat-input"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-nutrition-600 text-white rounded-full hover:bg-nutrition-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={!message.trim() || isLoading}
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">I only answer questions about nutrition, diet & health</p>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
