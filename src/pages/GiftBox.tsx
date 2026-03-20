import { useState, useCallback, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { CheckoutCTA } from "../components/CheckoutCTA";
import { Footer } from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { Heart, MessageCircle } from "lucide-react";

const giftBoxes = [
  {
    id: 1,
    name: "Teddy Bloom",
    category: "Hoa hồng",
    price: "480.000 VNĐ",
    priceValue: 480000,
    image: "https://images.unsplash.com/photo-1584285493011-8ec34299b803?q=80&w=800&auto=format&fit=crop",
    colors: ["#EAD8DB"],
  },
  {
    id: 2,
    name: "Sweet Surprise Box",
    category: "Hoa hồng",
    price: "480.000 VNĐ",
    priceValue: 480000,
    image: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=800&auto=format&fit=crop",
    colors: ["#AF668E", "#F8DF9E"],
  },
  {
    id: 3,
    name: "Pink Harmony Box",
    category: "Hoa hồng",
    price: "480.000 VNĐ",
    priceValue: 480000,
    image: "https://images.unsplash.com/photo-1562373209-5e6059d1a155?q=80&w=800&auto=format&fit=crop",
    colors: ["#EAD8DB", "#AF668E"],
  }
];

export default function GiftBox() {
  const { cartItems, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = useCallback((name: string, price: number) => {
    addToCart(name, price);
    setIsCartOpen(true);
  }, [addToCart]);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#F2EBEB",
        overflowX: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Navigation
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        forceSolid={true}
      />

      <div style={{ 
        flex: 1,
        paddingTop: "120px",
        paddingBottom: "80px",
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? "translateY(0px)" : "translateY(20px)", 
        transition: "opacity 1.4s 0.3s, transform 1.4s 0.3s",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        paddingLeft: "2rem",
        paddingRight: "2rem"
      }}>
        <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease", marginBottom: "3rem" }}>
          <div style={{ background: "#FFFFFF", padding: "1rem 3rem", borderRadius: "40px", display: "inline-block", border: "1px solid rgba(0,0,0,0.05)", marginBottom: "1rem", marginTop: "1rem" }}>
            <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.5rem", color: "#2B3020", margin: 0, lineHeight: 1 }}>
              Bộ sưu tập Gift-box
            </h2>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "3rem",
          }}
        >
          {giftBoxes.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleAddToCart(product.name, product.priceValue)}
              style={{
                background: "#FFFFFF",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                boxShadow: hoveredId === product.id
                  ? "0 20px 40px rgba(0,0,0,0.08)"
                  : "0 2px 10px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {/* Image Area */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "1/1",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: hoveredId === product.id ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                />

                {/* Wishlist */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  style={{
                    position: "absolute",
                    top: "1.2rem",
                    right: "1.2rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: wishlist.has(product.id) ? "#C4A35A" : "#C4A35A",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Heart
                    size={28}
                    strokeWidth={1.5}
                    fill={wishlist.has(product.id) ? "#C4A35A" : "none"}
                  />
                </button>
              </div>

              {/* Info Area */}
              <div style={{ padding: "2rem" }}>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    textAlign: "center",
                    margin: "0 0 1.5rem 0",
                    letterSpacing: "0.02em"
                  }}
                >
                  {product.name}
                </h3>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.4rem",
                      color: "#8B5A69",
                      fontWeight: 500,
                    }}
                  >
                    {product.category}
                  </span>

                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    {product.colors.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: color,
                          border: "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.4rem",
                      fontWeight: 500,
                      color: "#1A1A1A",
                    }}
                  >
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "fixed", bottom: "3rem", right: "3rem", zIndex: 10 }}>
        <button style={{
          border: "2px solid #1A1A1A",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "transparent",
        }}>
          <MessageCircle size={32} />
        </button>
      </div>

      <CheckoutCTA
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onCartClose={() => setIsCartOpen(false)}
        onBuildClick={() => window.scrollTo(0, 0)}
      />
      
      <Footer />
    </div>
  );
}
