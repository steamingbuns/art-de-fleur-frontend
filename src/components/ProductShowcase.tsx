import { useState } from "react";
import { ArrowRight, Heart, X } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Khu Vườn Bí Mật",
    subtitle: "Hồng & Mẫu Đơn",
    price: 890000,
    category: "Đặc Trưng",
    tag: "Bán Chạy Nhất",
    mood: "Lãng mạn",
    image:
      "https://images.unsplash.com/photo-1562373209-5e6059d1a155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9ueSUyMGJvdXF1ZXQlMjBsdXh1cnklMjBmbG9yYWwlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3NzM4MDY2ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#8B1A3A", "#F2D4D8", "#FAF6F0"],
  },
  {
    id: 2,
    name: "Ánh Sáng Ban Mai",
    subtitle: "Tulip Pastel",
    price: 650000,
    category: "Theo Mùa",
    tag: "Mới Mẻ",
    mood: "Tươi mát",
    image:
      "https://images.unsplash.com/photo-1768448595323-92ded21be885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxpcCUyMGJvdXF1ZXQlMjBwYXN0ZWwlMjBlbGVnYW50fGVufDF8fHx8MTc3MzgwNjY4NHww&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#E8A5B0", "#F7CDD3", "#FBF0E8"],
  },
  {
    id: 3,
    name: "Đêm Đầy Sao",
    subtitle: "Thược Dược & Tán Lá Trầm",
    price: 1150000,
    category: "Thượng Lưu",
    tag: "Bản Giới Hạn",
    mood: "Kịch tính",
    image:
      "https://images.unsplash.com/photo-1768243486539-4f0cdc822cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkYWhsaWElMjBmbG9yYWwlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzczODA2Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#2C1A2E", "#6B2D5E", "#C4A35A"],
  },
  {
    id: 4,
    name: "Cõi Tiên Thuần Khiết",
    subtitle: "Lan & Calla Trắng",
    price: 980000,
    category: "Đặc Trưng",
    tag: "Cưới Hỏi",
    mood: "Thanh khiết",
    image:
      "https://images.unsplash.com/photo-1767881897213-3999aa68f157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmbG9yYWwlMjBhcnJhbmdlbWVudCUyMHdlZGRpbmclMjB3aGl0ZXxlbnwxfHx8fDE3NzM4MDY2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#FAF6F0", "#E8E0D8", "#C4A35A"],
  },
  {
    id: 5,
    name: "Nắng Mùa Hạ",
    subtitle: "Hướng Dương & Cúc Họa Mi",
    price: 720000,
    category: "Theo Mùa",
    tag: "Hân hoan",
    mood: "Rực rỡ",
    image:
      "https://images.unsplash.com/photo-1558960645-5d3d1818cf49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5mbG93ZXIlMjBib3VxdWV0JTIwYnJpZ2h0JTIwam95ZnVsfGVufDF8fHx8MTc3MzgwNjY4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#E8B84B", "#F5D580", "#3D6B3A"],
  },
  {
    id: 6,
    name: "Khúc Thu Ca",
    subtitle: "Hoa Khô & Thảo Mộc",
    price: 780000,
    category: "Thủ Công",
    tag: "Bền vững",
    mood: "Hoài niệm",
    image:
      "https://images.unsplash.com/photo-1772381943253-a88b52c09921?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmllZCUyMGZsb3dlciUyMGJvdXF1ZXQlMjBlbGVnYW50JTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NzM4MDY2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#C49A6C", "#8B6A4A", "#E8D5B0"],
  },
  {
    id: 7,
    name: "Nụ Cười Pha Lê",
    subtitle: "Lan Hồ Điệp & Cát Tường",
    price: 1250000,
    category: "Thượng Lưu",
    tag: "Độc Quyền",
    mood: "Sang trọng",
    image:
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colors: ["#FFFFFF", "#F2D4D8", "#A8D0E6"],
  },
  {
    id: 8,
    name: "Giai Điệu Bình Minh",
    subtitle: "Cúc Mẫu Đơn & Thủy Tiên",
    price: 850000,
    category: "Theo Mùa",
    tag: "Bán Chạy",
    mood: "Ngọt ngào",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    colors: ["#F9A8D4", "#FBCFE8", "#A7F3D0"],
  },
];

const filters = ["Tất Cả", "Đặc Trưng", "Theo Mùa", "Thượng Lưu", "Thủ Công"];

interface ProductShowcaseProps {
  onAddToCart: (name: string, price: number) => void;
}

export function ProductShowcase({ onAddToCart }: ProductShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState("Tất Cả");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filtered =
    activeFilter === "Tất Cả"
      ? products
      : products.filter((p) => p.category === activeFilter);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section
      id="showcase"
      style={{ background: "#FAF6F0", padding: "6rem 0" }}
    >
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 4rem" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.4em",
              color: "#C4A35A",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Bộ Sưu Tập Giới Hạn
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              color: "#737a58",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            Sáng Tạo Dành Cho{" "}
            <em style={{ fontStyle: "italic" }}>Mùa Cưới</em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 300,
              color: "#8A7A72",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.8,
              letterSpacing: "0.03em",
            }}
          >
            Mỗi thiết kế là một bức tranh sống động — được sắp đặt từ những loài hoa 
            quý hiếm nhất, giao tận tay trong vòng 4 giờ với bao bì chữ ký độc quyền.
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background:
                  activeFilter === f ? "#737a58" : "transparent",
                border:
                  activeFilter === f
                    ? "1px solid #737a58"
                    : "1px solid rgba(115, 122, 88,0.25)",
                color: activeFilter === f ? "#FAF6F0" : "#737a58",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.5rem 1.3rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== f) {
                  e.currentTarget.style.background = "rgba(115, 122, 88,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== f) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: "#FFFFFF",
                cursor: "pointer",
                transform:
                  hoveredId === product.id
                    ? "translateY(-6px)"
                    : "translateY(0)",
                transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                boxShadow:
                  hoveredId === product.id
                    ? "0 20px 60px rgba(115, 122, 88,0.12)"
                    : "0 2px 20px rgba(115, 122, 88,0.05)",
              }}
            >
              {/* Image area */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "4/5",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform:
                      hoveredId === product.id
                        ? "scale(1.06)"
                        : "scale(1)",
                    transition: "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                />

                {/* Tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "#C4A35A",
                    color: "#FAF6F0",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.7rem",
                  }}
                >
                  {product.tag}
                </div>

                {/* Wishlist */}
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

                {/* Hover overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(115, 122, 88,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: hoveredId === product.id ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <button
                    onClick={() => setSelectedProduct(product)}
                    style={{
                      background: "#C4A35A",
                      border: "none",
                      color: "#FAF6F0",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      padding: "0.8rem 2rem",
                      cursor: "pointer",
                      transform:
                        hoveredId === product.id
                          ? "translateY(0)"
                          : "translateY(10px)",
                      transition:
                        "transform 0.4s ease 0.1s, background 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#B8934F")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#C4A35A")
                    }
                  >
                    Xem Chi Tiết
                  </button>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.62rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#C4A35A",
                        display: "block",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {product.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.35rem",
                        fontWeight: 500,
                        color: "#737a58",
                        lineHeight: 1.2,
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        color: "#8A7A72",
                        marginTop: "0.25rem",
                        fontWeight: 300,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {product.subtitle}
                    </p>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      color: "#737a58",
                    }}
                  >
                    {product.price}
                  </span>
                </div>

                {/* Color swatches */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    marginTop: "1rem",
                    alignItems: "center",
                  }}
                >
                  {product.colors.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: color,
                        border: "1px solid rgba(115, 122, 88,0.15)",
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      color: "#8A7A72",
                      marginLeft: "0.4rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {product.mood}
                  </span>
                  <ArrowRight
                    size={12}
                    style={{ marginLeft: "auto", color: "#C4A35A" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <button
            style={{
              background: "transparent",
              border: "1px solid #737a58",
              color: "#737a58",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "0.9rem 2.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#737a58";
              e.currentTarget.style.color = "#FAF6F0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#737a58";
            }}
          >
            Xem Toàn Bộ Sưu Tập <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem"
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <style>
            {`
              .product-modal {
                display: grid;
                grid-template-columns: 1fr 1fr;
              }
              .product-modal-img {
                height: 100%;
                min-height: 400px;
              }
              .product-modal-info {
                padding: 3rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
              @media (max-width: 768px) {
                .product-modal {
                  grid-template-columns: 1fr;
                }
                .product-modal-img {
                  height: 300px;
                  min-height: 300px;
                }
                .product-modal-info {
                  padding: 2rem;
                }
              }
            `}
          </style>
          <div
            className="product-modal"
            style={{
              backgroundColor: "#FAF6F0",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(255,255,255,0.8)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                color: "#737a58",
                transition: "background 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#fff"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.8)"}
            >
              <X size={20} />
            </button>
            <div className="product-modal-img">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="product-modal-info">
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C4A35A",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                {selectedProduct.category} • {selectedProduct.tag}
              </span>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  fontWeight: 500,
                  color: "#737a58",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem"
                }}
              >
                {selectedProduct.name}
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "#8A7A72",
                  marginBottom: "2rem",
                  fontWeight: 300,
                }}
              >
                {selectedProduct.subtitle}
              </p>
              
              <div style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(115, 122, 88, 0.15)" }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: 500,
                    color: "#737a58",
                  }}
                >
                  {selectedProduct.price.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>

              <div style={{ marginBottom: "3rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#8A7A72", textTransform: "uppercase", letterSpacing: "0.1em" }}>Tone màu:</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {selectedProduct.colors.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: color,
                        border: "1px solid rgba(115, 122, 88,0.15)",
                      }}
                    />
                  ))}
                </div>
                <span style={{ marginLeft: "1rem", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#8A7A72" }}>
                  Cảm hứng: {selectedProduct.mood}
                </span>
              </div>

              <button
                onClick={() => {
                  onAddToCart(selectedProduct.name, selectedProduct.price);
                  setSelectedProduct(null);
                }}
                style={{
                  background: "#737a58",
                  border: "none",
                  color: "#FAF6F0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.85rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "1rem 2rem",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  width: "100%"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#5a6045")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#737a58")}
              >
                Thêm Vào Giỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
