import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X, Plus, Minus, ArrowRight, Truck, Shield } from "lucide-react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutCTAProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  onCartClose: () => void;
  onBuildClick: () => void;
}

export function CheckoutCTA({
  cartItems,
  isCartOpen,
  onCartClose,
  onBuildClick,
}: CheckoutCTAProps) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "shipping" | "payment" | "confirmed">("cart");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const getQuantity = (name: string) =>
    quantities[name] !== undefined ? quantities[name] : 1;

  const adjustQty = (name: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(0, (prev[name] ?? 1) + delta),
    }));
  };

  const visibleItems = cartItems.filter((item) => getQuantity(item.name) > 0);

  const subtotal = visibleItems.reduce((sum, item) => {
    return sum + item.price * getQuantity(item.name);
  }, 0);

  const delivery = subtotal > 1500000 ? 0 : 30000;
  const total = subtotal + delivery;

  const formatVND = (price: number | undefined) => {
    if (typeof price !== "number" || isNaN(price)) return "0 VNĐ";
    return price.toLocaleString("vi-VN") + " VNĐ";
  };

  return (
    <>
      {/* CTA Banner */}
      <section
        style={{
          background: "linear-gradient(135deg, #FAF6F0 0%, #F0E8DC 100%)",
          padding: "7rem 2rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            width: "100px",
            height: "1px",
            background: "rgba(196,163,90,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            width: "1px",
            height: "100px",
            background: "rgba(196,163,90,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            width: "100px",
            height: "1px",
            background: "rgba(196,163,90,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            width: "1px",
            height: "100px",
            background: "rgba(196,163,90,0.4)",
          }}
        />

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#C4A35A",
            marginBottom: "1.5rem",
          }}
        >
          Đặt Hàng Ngay
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 400,
            color: "#737a58",
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            maxWidth: "800px",
            margin: "0 auto 1.5rem",
          }}
        >
          Trao Tặng Khoảnh Khắc{" "}
          <em style={{ fontStyle: "italic" }}>Khó Quên</em>
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            fontWeight: 300,
            color: "#8A7A72",
            maxWidth: "480px",
            margin: "0 auto 3rem",
            lineHeight: 1.8,
            letterSpacing: "0.03em",
          }}
        >
          Miễn phí giao hàng cho đơn từ 1.500.000 VNĐ. Giao ngay trong ngày khi đặt trước 3h chiều. Từng đóa hoa được gói ghém riêng cho những dịp xứng đáng với sự hoàn mỹ tuyệt đối.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onBuildClick}
            style={{
              background: "#737a58",
              border: "none",
              color: "#FAF6F0",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "1.1rem 2.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C4A35A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#737a58";
            }}
          >
            <ShoppingBag size={16} /> Thiết Kế Tác Phẩm
          </button>
          <button
            style={{
              background: "transparent",
              border: "1px solid #737a58",
              color: "#737a58",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "1.1rem 2.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
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
            Tặng Gói Hoa Định Kỳ
          </button>
        </div>

        {/* Trust signals */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginTop: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { icon: <Truck size={15} />, text: "Giao Hàng Trong 4H" },
            { icon: <Shield size={15} />, text: "Bảo Chứng Tươi Mới" },
            { icon: <ShoppingBag size={15} />, text: "Tặng Gói Quà Trứ Danh" },
          ].map((t) => (
            <div
              key={t.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#8A7A72",
              }}
            >
              <span style={{ color: "#C4A35A" }}>{t.icon}</span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                }}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          pointerEvents: isCartOpen ? "all" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          onClick={onCartClose}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(28,13,16,0.6)",
            opacity: isCartOpen ? 1 : 0,
            transition: "opacity 0.4s ease",
            backdropFilter: "blur(4px)",
          }}
        />

        {/* Drawer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            maxWidth: "480px",
            background: "#FAF6F0",
            transform: isCartOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.5s cubic-bezier(0.77,0,0.175,1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Drawer header */}
          <div
            style={{
              padding: "1.5rem 2rem",
              borderBottom: "1px solid rgba(115, 122, 88,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "#737a58",
                  lineHeight: 1,
                }}
              >
                {checkoutStep === "cart"
                  ? "Giỏ Hàng Của Bạn"
                  : checkoutStep === "shipping"
                  ? "Giao Hàng"
                  : checkoutStep === "payment"
                  ? "Thanh Toán"
                  : "Xác Nhận!"}
              </h2>
              {checkoutStep === "cart" && visibleItems.length > 0 && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    color: "#8A7A72",
                    marginTop: "0.2rem",
                  }}
                >
                  {visibleItems.length} tác phẩm
                </p>
              )}
            </div>
            <button
              onClick={onCartClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#737a58",
                padding: "0.3rem",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem" }}>
            {checkoutStep === "cart" && (
              <>
                {visibleItems.length === 0 ? (
                  <div style={{ textAlign: "center", paddingTop: "4rem" }}>
                    <ShoppingBag size={40} style={{ color: "rgba(115, 122, 88,0.2)", margin: "0 auto 1rem" }} />
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontStyle: "italic", color: "#8A7A72" }}>
                      Giỏ hàng của bạn đang trống
                    </p>
                    <button
                      onClick={() => { onCartClose(); onBuildClick(); }}
                      style={{
                        marginTop: "1.5rem",
                        background: "#737a58",
                        border: "none",
                        color: "#FAF6F0",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.72rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        padding: "0.8rem 1.8rem",
                        cursor: "pointer",
                      }}
                    >
                      Thiết Kế Tác Phẩm
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {cartItems.map((item, i) => {
                      const qty = getQuantity(item.name);
                      if (qty === 0) return null;
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: "1rem",
                            padding: "1.2rem",
                            border: "1px solid rgba(115, 122, 88,0.08)",
                            background: "#FFFFFF",
                          }}
                        >
                          <div
                            style={{
                              width: "70px",
                              height: "70px",
                              background: "linear-gradient(135deg, #F2D4D8, #E8C0C8)",
                              flexShrink: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.8rem",
                            }}
                          >
                            🌸
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "1rem",
                                fontWeight: 500,
                                color: "#737a58",
                                marginBottom: "0.2rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.name}
                            </p>
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.65rem",
                                color: "#C4A35A",
                                letterSpacing: "0.1em",
                                marginBottom: "0.7rem",
                              }}
                            >
                              Tác Phẩm Độc Bản
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                <button
                                  onClick={() => adjustQty(item.name, -1)}
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    border: "1px solid rgba(115, 122, 88,0.2)",
                                    background: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#737a58",
                                  }}
                                >
                                  <Minus size={10} />
                                </button>
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#737a58", minWidth: "20px", textAlign: "center" }}>
                                  {qty}
                                </span>
                                <button
                                  onClick={() => adjustQty(item.name, 1)}
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    border: "1px solid rgba(115, 122, 88,0.2)",
                                    background: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#737a58",
                                  }}
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, color: "#737a58" }}>
                                {formatVND(item.price * getQuantity(item.name))}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {checkoutStep === "shipping" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#737a58", marginBottom: "0.5rem" }}>
                  Thông Tin Giao Hàng
                </h3>
                {[
                  { label: "Họ & Tên", placeholder: "Nguyễn Văn A" },
                  { label: "Email", placeholder: "a.nguyen@email.com" },
                  { label: "Số Điện Thoại", placeholder: "+84 90 123 4567" },
                  { label: "Địa Chỉ", placeholder: "12 Đường Lê Lợi" },
                  { label: "Thành Phố", placeholder: "Hà Nội" },
                  { label: "Mã Bưu Điện", placeholder: "100000" },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A7A72", display: "block", marginBottom: "0.4rem", fontWeight: 400 }}>
                      {field.label}
                    </label>
                    <input
                      placeholder={field.placeholder}
                      style={{
                        width: "100%",
                        border: "1px solid rgba(115, 122, 88,0.15)",
                        background: "#FFFFFF",
                        color: "#737a58",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.9rem",
                        padding: "0.8rem 1rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}

                <div style={{ padding: "1rem", background: "rgba(196,163,90,0.08)", border: "1px solid rgba(196,163,90,0.2)", marginTop: "0.5rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#737a58", lineHeight: 1.6 }}>
                    🕐 <strong>Giao Hàng Ngay Trong Ngày</strong> — Đặt trước 15H00 để được giao ngay trong ngày tại nội thành.
                  </p>
                </div>
              </div>
            )}

            {checkoutStep === "payment" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#737a58", marginBottom: "0.5rem" }}>
                  Thanh Toán An Toàn
                </h3>
                <div>
                  <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A7A72", display: "block", marginBottom: "0.4rem", fontWeight: 400 }}>
                    Số Thẻ
                  </label>
                  <input
                    placeholder="4242 4242 4242 4242"
                    style={{ width: "100%", border: "1px solid rgba(115, 122, 88,0.15)", background: "#FFFFFF", color: "#737a58", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", padding: "0.8rem 1rem", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A7A72", display: "block", marginBottom: "0.4rem", fontWeight: 400 }}>
                      Ngày Hết Hạn
                    </label>
                    <input placeholder="MM / AA" style={{ width: "100%", border: "1px solid rgba(115, 122, 88,0.15)", background: "#FFFFFF", color: "#737a58", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", padding: "0.8rem 1rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A7A72", display: "block", marginBottom: "0.4rem", fontWeight: 400 }}>
                      CVV
                    </label>
                    <input placeholder="123" style={{ width: "100%", border: "1px solid rgba(115, 122, 88,0.15)", background: "#FFFFFF", color: "#737a58", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", padding: "0.8rem 1rem", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#8A7A72", marginTop: "0.5rem" }}>
                  <Shield size={14} style={{ color: "#2E7A5C", flexShrink: 0 }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", lineHeight: 1.5 }}>
                    Thanh toán 100% bảo mật qua Stripe. Dữ liệu của bạn không bao giờ bị lưu trữ.
                  </p>
                </div>
              </div>
            )}

            {checkoutStep === "confirmed" && (
              <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#C4A35A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
                  <span style={{ fontSize: "2rem" }}>✓</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#737a58", marginBottom: "1rem" }}>
                  <em>Đặt Hàng Thành Công!</em>
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#8A7A72", lineHeight: 1.8, marginBottom: "1rem" }}>
                  Cảm ơn bạn đã tin tưởng. Các nghệ nhân của chúng tôi đang bắt đầu thiết kế bó hoa của bạn ngay lúc này.
                </p>
                <div style={{ background: "rgba(196,163,90,0.1)", border: "1px solid rgba(196,163,90,0.3)", padding: "1rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#737a58" }}>
                    📧 Một email xác nhận đã được gửi cho bạn<br />
                    🕐 Giao hàng dự kiến : <strong>Hôm nay, 15H–17H</strong>
                  </p>
                </div>
                <button
                  onClick={() => { setCheckoutStep("cart"); onCartClose(); }}
                  style={{
                    background: "#737a58",
                    border: "none",
                    color: "#FAF6F0",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "0.8rem 2rem",
                    cursor: "pointer",
                  }}
                >
                  Đóng
                </button>
              </div>
            )}
          </div>

          {/* Drawer footer */}
          {checkoutStep !== "confirmed" && visibleItems.length > 0 && (
            <div
              style={{
                padding: "1.5rem 2rem",
                borderTop: "1px solid rgba(115, 122, 88,0.08)",
                background: "#FFFFFF",
                flexShrink: 0,
              }}
            >
              {checkoutStep === "cart" && (
                <div style={{ marginBottom: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#8A7A72" }}>Tạm tính</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#737a58" }}>{formatVND(subtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#8A7A72" }}>Phí Giao Hàng</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: delivery === 0 ? "#2E7A5C" : "#737a58" }}>
                      {delivery === 0 ? "Miễn phí ✓" : formatVND(delivery)}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(115, 122, 88,0.1)", paddingTop: "0.8rem" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 500, color: "#737a58" }}>Tổng Cộng</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#737a58" }}>{formatVND(total)}</span>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  if (checkoutStep === "cart") {
                    onCartClose();
                    const itemsWithQty = visibleItems.map(item => ({ ...item, quantity: getQuantity(item.name) }));
                    navigate("/checkout", { state: { cartItems: itemsWithQty, subtotal, delivery, total } });
                    window.scrollTo(0, 0);
                  }
                  else if (checkoutStep === "shipping") setCheckoutStep("payment");
                  else if (checkoutStep === "payment") setCheckoutStep("confirmed");
                }}
                style={{
                  width: "100%",
                  background: "#737a58",
                  border: "none",
                  color: "#FAF6F0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#C4A35A")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#737a58")}
              >
                {checkoutStep === "cart"
                  ? "Tiến Hành Giao Hàng"
                  : checkoutStep === "shipping"
                  ? "Tiếp Tục Thanh Toán"
                  : "Xác Nhận & Thanh Toán"}
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
