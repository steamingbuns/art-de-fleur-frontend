import { useState, useCallback, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { products } from "../components/ProductShowcase";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { CheckoutCTA } from "../components/CheckoutCTA";
import { useCart } from "../contexts/CartContext";

export default function PreOrder() {
  const { cartItems, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <div style={{ background: "#FAF6F0", minHeight: "100vh", display: "flex", flexDirection: "column", opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <Navigation 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        forceSolid={true}
      />

      <main style={{ flex: 1, padding: "8rem 2rem 4rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400,
            color: "#737a58",
            lineHeight: 1.1,
            marginBottom: "1rem"
          }}>
            Tất Cả Sản Phẩm
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "#8A7A72",
            maxWidth: "600px",
            margin: "0 auto",
            fontWeight: 300,
            lineHeight: 1.6
          }}>
            Khám phá toàn bộ bộ sưu tập hoa của chúng tôi. Mỗi thiết kế đều là một tác phẩm tinh tế dành cho bạn.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {products.map((product) => (
            <div 
              key={product.id}
              style={{
                display: "flex",
                background: "#FFFFFF",
                boxShadow: "0 4px 20px rgba(115, 122, 88, 0.05)",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                flexDirection: window.innerWidth < 768 ? "column" : "row"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(115, 122, 88, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(115, 122, 88, 0.05)";
              }}
            >
              <div style={{
                width: window.innerWidth < 768 ? "100%" : "300px",
                height: window.innerWidth < 768 ? "300px" : "auto",
                aspectRatio: "1",
                position: "relative",
                flexShrink: 0
              }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "rgba(250,246,240,0.9)",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: wishlist.has(product.id) ? "#C4A35A" : "#8A7A72",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Heart
                    size={15}
                    fill={wishlist.has(product.id) ? "#C4A35A" : "none"}
                  />
                </button>
              </div>

              <div style={{ padding: "2rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#C4A35A",
                      display: "block",
                      marginBottom: "0.5rem"
                    }}>
                      {product.category} • {product.tag}
                    </span>
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.8rem",
                      fontWeight: 500,
                      color: "#737a58",
                      marginBottom: "0.5rem"
                    }}>
                      {product.name}
                    </h2>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      color: "#8A7A72",
                      fontWeight: 300
                    }}>
                      {product.subtitle}
                    </p>
                  </div>
                  <div style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    fontSize: "1.6rem", 
                    fontWeight: 600, 
                    color: "#737a58" 
                  }}>
                    {product.price.toLocaleString("vi-VN")} VNĐ
                  </div>
                </div>

                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", color: "#8A7A72", fontFamily: "'Inter', sans-serif", marginRight: "0.5rem" }}>Tone màu:</span>
                  {product.colors.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: color,
                        border: "1px solid rgba(115, 122, 88,0.15)",
                      }}
                    />
                  ))}
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.8rem",
                    color: "#8A7A72",
                    marginLeft: "1rem",
                  }}>
                    Cảm hứng: {product.mood}
                  </span>
                </div>

                <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.name, product.price);
                    }}
                    style={{
                      background: "#737a58",
                      color: "#FAF6F0",
                      border: "none",
                      padding: "0.8rem 2rem",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "background 0.3s ease"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#5c6246")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#737a58")}
                  >
                    <ShoppingBag size={16} /> Thêm Vào Giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CheckoutCTA
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onCartClose={() => setIsCartOpen(false)}
        onBuildClick={() => navigate("/customize")}
      />

      <Footer />
    </div>
  );
}
