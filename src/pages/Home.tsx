import { useState, useCallback } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { ProductShowcase } from "../components/ProductShowcase";
import { StorytellingSection } from "../components/StorytellingSection";
import { BrandValues } from "../components/BrandValues";
import { CheckoutCTA } from "../components/CheckoutCTA";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Home() {
  const { cartItems, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = useCallback((name: string, price: number) => {
    addToCart(name, price);
    setIsCartOpen(true);
  }, [addToCart]);

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
      <ProductShowcase onAddToCart={handleAddToCart} />
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
