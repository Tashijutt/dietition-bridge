
import Header from "@/components/Header";
import ChatPage from "@/components/ChatPage";
import Footer from "@/components/Footer";

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ChatPage />
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
