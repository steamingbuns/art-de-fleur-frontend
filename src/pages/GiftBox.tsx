import { useState, useCallback, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { BouquetBuilder } from "../components/BouquetBuilder";
import { CheckoutCTA } from "../components/CheckoutCTA";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function GiftBox() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = useCallback((name: string, price: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { name, price, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const scrollToBuilder = () => {
    // Already on builder page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#FAF6F0",
        overflowX: "hidden",
      }}
    >
      <Navigation
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        forceSolid={true}
      />

      <div style={{ 
        paddingTop: "80px",
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? "translateY(0px)" : "translateY(50px)", 
        transition: "opacity 1.4s 0.3s, transform 1.4s 0.3s"
      }}> {/* Add offset for the fixed navbar */}
        <BouquetBuilder onAddToCart={addToCart} type="gift_box" />
      </div>

      <CheckoutCTA
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onCartClose={() => setIsCartOpen(false)}
        onBuildClick={scrollToBuilder}
      />
      <Footer />
    </div>
  );
}
