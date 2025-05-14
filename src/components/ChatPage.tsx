
import { useState, useRef, useEffect } from "react";
import { Send, ChevronDown, ArrowLeft, StopCircle, Copy, Edit2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getAIResponse } from "@/services/ai";
import { toast } from "@/hooks/use-toast";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([
    {
      type: 'bot',
      content: 'Assalam o Alaikum! I\'m Dr. Nasreen Fatima, a nutrition specialist with Dietitian Bridge Pakistan. I specialize in providing information about Pakistani nutrition, diet plans for specific health conditions, and can help you adapt traditional Pakistani cuisine for conditions like diabetes, hypertension, or weight management. How can I assist you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [fullResponse, setFullResponse] = useState(""); // Store the complete response
  const [typedResponse, setTypedResponse] = useState(""); // Store the currently typed portion
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Ensure the page starts from the top when it first loads
    window.scrollTo(0, 0);
    
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
    
    // Add an empty bot message as a placeholder for typing
    setMessages(prev => [...prev, { type: 'bot', content: "" }]);
  
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
      // Remove the empty bot message placeholder
      setMessages(prev => prev.slice(0, -1));
    }
  };

  const suggestedQuestions = [
    "What's a good diet for diabetes in Pakistan?",
    "How can I reduce blood pressure with Pakistani foods?",
    "Recommend meals for hypertension patients",
    "What should I eat to lose weight while enjoying desi food?",
    "Can you suggest a diet plan for Ramadan?"
  ];

  // Only show first 3
  const displayedSuggestions = suggestedQuestions.slice(0, 3);

  const handleSuggestedQuestion = async (question: string) => {
    setShowSuggestions(false);
    setMessage("");
    setIsLoading(true);
    setStopped(false);
    setFullResponse("");
    setTypedResponse("");
    
    // Corrected: Append to existing messages instead of replacing
    setMessages(prev => [
      ...prev, // Keep previous messages
      { type: "user", content: question },
      { type: "bot", content: "" } // Empty placeholder for typing effect
    ]);
    
    try {
      const response = await getAIResponse(question);
      setFullResponse(response);
    } catch (error) {
      // Corrected: Update the last bot message with error, don't replace all messages
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.type === 'bot') {
          newMessages[newMessages.length - 1].content = "Sorry, there was a problem getting your answer.";
        } else {
          // Fallback if the last message wasn't the placeholder (shouldn't happen often)
          newMessages.push({ type: "bot", content: "Sorry, there was a problem getting your answer." });
        }
        return newMessages;
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
    <div className="min-h-[calc(100vh-7rem)] bg-white from-gray-100 to-blue-50">
      <div className="mx-auto h-[calc(100vh-7rem)] flex flex-col">
        {/* Header */}
        <div className="bg-indigo-900 text-white p-3 flex items-center justify-between shadow-md rounded-t-xl">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-2">
              <span className="text-sm font-bold">DB</span>
            </div>
            <div>
              <div className="font-semibold">Dr. Nasreen Fatima</div>
              <div className="text-xs opacity-80">Online</div>
            </div>
          </div>
          <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
            Beta
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 bg-transparent"
        >
          <div className="space-y-3">
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
                    "max-w-[75%] rounded-2xl px-4 py-2 relative shadow-md",
                    msg.type === 'user'
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  )}
                >
                  {msg.type === 'user' && editingIndex === index ? (
                    <div>
                      <textarea
                        className="w-full rounded p-2 border border-gray-300"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded"
                          onClick={() => handleEditSave(index)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-200 rounded"
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm leading-relaxed whitespace-pre-line">
                        {/* Show typing effect for the last bot message */}
                        {msg.type === 'bot' && index === messages.length - 1 && isLoading
                          ? typedResponse || (
                              <div className="flex space-x-2">
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                              </div>
                            )
                          : msg.content}
                      </div>
                      {msg.type === 'user' && (
                        <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={() => handleEdit(index, msg.content)}
                            className="p-1 bg-gray-200 rounded-full hover:bg-blue-100 border border-gray-300 transition-colors"
                            title="Edit message"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {msg.type === 'bot' && (
                        <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={() => handleCopy(msg.content)}
                            className="p-1 bg-gray-200 rounded-full hover:bg-blue-100 border border-gray-300 transition-colors"
                            title="Copy to clipboard"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          
            
            {/* Stop button (only shown during typing) */}
            {isLoading && typedResponse && !stopped && (
              <div className="flex justify-center">
                <button
                  onClick={handleStop}
                  className="p-1 bg-red-100 rounded-full hover:bg-red-200 border border-red-300 transition-colors flex items-center">
                  <StopCircle className="w-4 h-4 text-red-500" />
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions - Professional UI */}
        {showSuggestions && (
          <div className="bg-transparent p-4 flex justify-center">
            <div className="flex gap-4">
              {displayedSuggestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="bg-white shadow-lg border border-gray-200 rounded-xl px-5 py-2 text-gray-800 font-medium text-sm hover:bg-blue-50 hover:text-blue-700 transition-all duration-150 focus:outline-none"
                  style={{ minWidth: 180 }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="bg-white border-t p-3 rounded-b shadow-lg">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question here..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-base"
              disabled={isLoading}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(e as any);
                }
              }}
            />
            <button
              onClick={handleSubmit}
              className="absolute right-2 p-1.5 text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!message.trim() || isLoading}
              title="Send"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            This AI assistant provides general nutrition information based on Pakistani cuisine and lifestyle. Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
