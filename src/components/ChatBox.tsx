import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Xin chào! Chào mừng bạn đến với Art de Fleur.", sender: "bot", time: "08:00" },
    { id: 2, text: "Mình có thể nhận tư vấn về một bó hoa cá nhân hóa không?", sender: "user", time: "08:05" },
    { id: 3, text: "Dạ chắc chắn rồi ạ! Bạn muốn dành tặng bó hoa này cho ai và nhân dịp gì ạ?", sender: "bot", time: "08:06" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Simulate bot replying elegantly
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: "Cảm ơn bạn đã chia sẻ. Chuyên viên cắm hoa của chúng tôi sẽ thiết kế và gợi ý cho bạn một mẫu phù hợp nhất nhé!",
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1200);
  };

  return (
    <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999 }}>
      
      {/* The Chat Window */}
      <div style={{
        position: "absolute",
        bottom: "80px",
        right: "0",
        width: "360px",
        height: "520px",
        backgroundColor: "#FAF6F0",
        borderRadius: "16px",
        boxShadow: "0 15px 40px rgba(43, 48, 32, 0.15)",
        border: "1px solid rgba(115, 122, 88, 0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        pointerEvents: isOpen ? "auto" : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transformOrigin: "bottom right"
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: "#5D6346",
          padding: "1.5rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#FAF6F0"
        }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", margin: 0, fontWeight: 500, letterSpacing: "0.02em" }}>
              Art de Fleur
            </h3>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", opacity: 0.9 }}>
              Chuyên viên tư vấn
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#FAF6F0",
              cursor: "pointer",
              padding: "0.2rem",
              display: "flex"
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Message List */}
        <div style={{ 
            flex: 1, 
            padding: "1.5rem", 
            overflowY: "auto", 
            display: "flex", 
            flexDirection: "column", 
            gap: "1.2rem",
            backgroundColor: "#F8F4EC" 
        }}>
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "85%",
                  padding: "0.8rem 1.2rem",
                  backgroundColor: isUser ? "#5D6346" : "#E8E4D9",
                  color: isUser ? "#FAF6F0" : "#2B3020",
                  borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                }}>
                  {msg.text}
                </div>
                <span style={{ 
                  fontFamily: "'Inter', sans-serif", 
                  fontSize: "0.75rem", 
                  color: "#999", 
                  marginTop: "0.4rem",
                  padding: isUser ? "0 0.5rem 0 0" : "0 0 0 0.5rem"
                }}>
                  {msg.time}
                </span>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ 
          padding: "1rem", 
          backgroundColor: "#fff", 
          borderTop: "1px solid rgba(115, 122, 88, 0.15)",
          display: "flex",
          alignItems: "center",
          gap: "0.8rem"
        }}>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Nhập tin nhắn của bạn..."
            style={{
              flex: 1,
              padding: "0.8rem 1.2rem",
              borderRadius: "24px",
              border: "1px solid rgba(115, 122, 88, 0.3)",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              backgroundColor: "#FAF6F0",
              color: "#2B3020"
            }}
          />
          <button 
            onClick={handleSend}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#737a58",
              color: "#FAF6F0",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#5D6346"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#737a58"}
          >
            <Send size={18} style={{ marginRight: "-2px" }} />
          </button>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#5D6346",
          color: "#FAF6F0",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(43, 48, 32, 0.3)",
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "scale(0.85)" : "scale(1)"
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = isOpen ? "scale(0.85)" : "scale(1.05)"}
        onMouseOut={(e) => e.currentTarget.style.transform = isOpen ? "scale(0.85)" : "scale(1)"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

    </div>
  );
}
