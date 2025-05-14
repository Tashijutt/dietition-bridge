
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatPage from "@/components/ChatPage";
import { Send, ChevronDown, ArrowLeft, StopCircle, Copy, Edit2 } from "lucide-react";
import { getAIResponse } from "@/services/ai";
import { toast } from "@/hooks/use-toast";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([
    {
      type: 'bot',
      content: 'Assalam o Alaikum! I\'m Dr. Nasreen Fatima, a nutrition specialist with Dietitian Bridge Pakistan. I specialize in providing information about Pakistani nutrition, diet plans for specific health conditions, and can help you adapt traditional Pakistani cuisine for conditions like diabetes, hypertension, or weight management. How can I assist you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [botResponse, setBotResponse] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [stopped, setStopped] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, botResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const userMessage = message.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setMessage("");
    setIsLoading(true);
    setBotResponse([]);
    try {
      const response = await getAIResponse(userMessage);
      let index = 0;
      const interval = setInterval(() => {
        if (index < response.length) {
          setBotResponse(prev => [...prev, response[index]]);
          index++;
        } else {
          clearInterval(interval);
          setMessages(prev => [...prev, { type: 'bot', content: response }]);
          setIsLoading(false);
        }
      }, 20);
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
    "Recommend meals for hypertension patients",
    "What should I eat to lose weight while enjoying desi food?",
    "Can you suggest a diet plan for Ramadan?"
  ];

  const handleSuggestedQuestion = async (question: string) => {
    setShowSuggestions(false);
    setMessage("");
    setIsLoading(true);
    setStopped(false);
    setMessages([
      { type: "user", content: question }
    ]);
    try {
      const response = await getAIResponse(question);
      setMessages([
        { type: "user", content: question },
        { type: "bot", content: response }
      ]);
    } catch (error) {
      setMessages([
        { type: "user", content: question },
        { type: "bot", content: "Sorry, there was a problem getting your answer." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = () => {
    setStopped(true);
    setIsLoading(false);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-blue-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-2 max-w-[1280px]">
          <div className="mx-auto">
            <ChatPage />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
