import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import GiftBox from "./pages/GiftBox";
import Checkout from "./pages/Checkout";
import PreOrder from "./pages/PreOrder";
import { ChatBox } from "./components/ChatBox";
import { CartProvider } from "./contexts/CartContext";
import "./styles/fonts.css";

export default function App() {
  return (
    <CartProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/gift-box" element={<GiftBox />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pre-order" element={<PreOrder />} />
      </Routes>
      
      <ChatBox />

      {/* Global styles */}
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background: #FAF6F0;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #FAF6F0;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(115, 122, 88, 0.3);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(115, 122, 88, 0.5);
        }
        ::placeholder {
          color: rgba(115, 122, 88, 0.3);
          font-family: 'Inter', sans-serif;
        }
        textarea::placeholder {
          color: rgba(250, 246, 240, 0.25);
        }
        input[style*="rgba(250,246,240"]::placeholder {
          color: rgba(250, 246, 240, 0.25);
        }
        h1, h2, h3, h4 {
          font-size: unset;
          font-weight: unset;
          line-height: unset;
        }
        button {
          font-size: unset;
          font-weight: unset;
          line-height: unset;
        }
      `}</style>
      </Router>
    </CartProvider>
  );
}
