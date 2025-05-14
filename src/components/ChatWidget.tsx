
import { useState, useRef, useEffect } from "react";
import { Send, StopCircle, Copy, Edit2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAIResponse } from "@/services/ai";
import { toast } from "@/hooks/use-toast";

interface ChatWidgetProps {
  onClose: () => void;
}

// Create a key for sessionStorage
const CHAT_STORAGE_KEY = "dietitian_bridge_chat_session";

const ChatWidget = ({ onClose }: ChatWidgetProps) => {
  // Initialize messages with default welcome message
  const defaultMessage = {
    type: 'bot' as const,
    content: 'Hello there! Would you like to discuss meal planning, specific health conditions, or general wellness?'
  };
  
  // Use a state variable to track if this is the initial render
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([defaultMessage]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [fullResponse, setFullResponse] = useState(""); 
  const [typedResponse, setTypedResponse] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from sessionStorage only when the widget is opened, not on refresh
  useEffect(() => {
    if (isInitialRender) {
      const savedMessages = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error("Error parsing saved messages:", e);
        }
      }
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    if (!isInitialRender) {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isInitialRender]);

  useEffect(() => {
    // Focus on the input field
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll only the messages container to the bottom when messages change
    if (messagesEndRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, typedResponse]);

  // Typing effect
  useEffect(() => {
    if (isLoading && fullResponse && !stopped) {
      if (typedResponse.length < fullResponse.length) {
        const timeout = setTimeout(() => {
          setTypedResponse(fullResponse.slice(0, typedResponse.length + 1));
        }, 18); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Typing complete
        setIsLoading(false);
        // Update the messages array with the full response
        setMessages(prev => {
          const newMessages = [...prev];
          // If we already added a bot message placeholder, update it
          if (newMessages[newMessages.length - 1]?.type === 'bot') {
            newMessages[newMessages.length - 1].content = fullResponse;
          } else {
            // Otherwise add a new bot message
            newMessages.push({ type: 'bot', content: fullResponse });
          }
          return newMessages;
        });
      }
    }
  }, [isLoading, fullResponse, typedResponse, stopped]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!message.trim()) return;
  
    const userMessage = message.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setMessage("");
    setIsLoading(true);
    setStopped(false);
    setFullResponse("");
    setTypedResponse("");
    setShowSuggestions(false);
    
    try {
      const response = await getAIResponse(userMessage);
      setFullResponse(response);
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Connection Issue",
        description: "We're having trouble connecting to our nutrition AI. Please try again shortly.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What's a good diet for diabetes in Pakistan?",
    "How can I reduce blood pressure with Pakistani foods?",
    "Recommend meals for hypertension patients"
  ];

  const handleSuggestedQuestion = async (question: string) => {
    setShowSuggestions(false);
    setMessage("");
    setIsLoading(true);
    setStopped(false);
    setFullResponse("");
    setTypedResponse("");
    
    // First add the user message
    setMessages(prev => [...prev, { type: "user", content: question }]);
    
    try {
      const response = await getAIResponse(question);
      setFullResponse(response);
    } catch (error) {
      setMessages(prev => {
        return [...prev, { type: "bot", content: "Sorry, there was a problem getting your answer." }];
      });
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    setStopped(true);
    setIsLoading(false);
    
    // Update the last message with what we've typed so far
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages[newMessages.length - 1]?.type === 'bot') {
        newMessages[newMessages.length - 1].content = typedResponse;
      } else {
        newMessages.push({ type: 'bot', content: typedResponse });
      }
      return newMessages;
    });
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({ title: "Copied!", description: "Response copied to clipboard." });
  };

  const handleEdit = (index: number, content: string) => {
    setEditingIndex(index);
    setEditValue(content);
  };

  const handleEditSave = (index: number) => {
    setMessages((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, content: editValue } : msg
      )
    );
    setEditingIndex(null);
    setEditValue("");
  };

  return (
    <div className="fixed bottom-20 right-5 w-[380px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-900 text-white p-3 flex justify-between shadow-md rounded-t-xl">
        <div className="flex">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
            <span className="text-sm font-bold">DB</span>
          </div>
          <div>
            <div className="font-semibold">Dr. Nasreen Fatima</div>
            <div className="text-xs opacity-80">Online</div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-transparent"
      >
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex group",
                msg.type === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {msg.type === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2 self-end shadow">
                  <span className="text-sm font-bold">DB</span>
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-lg shadow-sm text-sm",
                  msg.type === 'user'
                    ? "bg-blue-600 text-white rounded-br-none" // Removed pb-3 to fix padding issue
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                )}
              >
                {editingIndex === index ? (
                  <div className="flex flex-col space-y-2">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="px-2 py-1 bg-gray-300 rounded text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEditSave(index)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="whitespace-pre-wrap text-left">{msg.content}</p>
                    <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end space-x-1">
                      <button
                        onClick={() => handleCopy(msg.content)}
                        className="p-1 rounded hover:bg-gray-500 text-white"
                        title="Copy"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {msg.type === 'user' && (
                        <button
                          onClick={() => handleEdit(index, msg.content)}
                          className="p-1 rounded hover:bg-gray-500 text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {msg.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-2 self-end shadow">
                  <span className="text-sm font-bold">You</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator - always show with consistent styling */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2 self-end shadow">
                <span className="text-sm font-bold">DB</span>
              </div>
              <div className="max-w-[80%] p-3 rounded-lg shadow-sm bg-gray-100 text-gray-800 rounded-bl-none text-sm">
                {typedResponse ? (
                  <p className="whitespace-pre-wrap text-left">{typedResponse}</p>
                ) : (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions - Integrated into chat area */}
      {showSuggestions && messages.length === 1 && (
        <div className="px-4 py-3 bg-gray-50">
          <p className="text-xs font-medium text-gray-700 mb-2">Suggested questions:</p>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="w-full text-left p-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isLoading}
          />
          {isLoading ? (
            <button
              type="button"
              onClick={handleStop}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              title="Stop generating"
            >
              <StopCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;
