import { useState, useCallback } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { ProductShowcase } from "../components/ProductShowcase";
import { StorytellingSection } from "../components/StorytellingSection";
import { BrandValues } from "../components/BrandValues";
import { CheckoutCTA } from "../components/CheckoutCTA";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

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
    navigate("/customize");
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
      <Hero onBuildClick={scrollToBuilder} />
      <ProductShowcase onAddToCart={addToCart} />
      <StorytellingSection />
      <BrandValues />
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
