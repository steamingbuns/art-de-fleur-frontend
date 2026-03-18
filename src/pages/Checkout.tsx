import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Shield, Truck, CreditCard, Wallet, Banknote } from "lucide-react";

const formatVND = (price: number | undefined) => {
  if (typeof price !== "number" || isNaN(price)) return "0 VNĐ";
  return price.toLocaleString('vi-VN') + ' VNĐ';
};

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], subtotal = 0, delivery = 0, total = 0 } = location.state || {};
  
  const [step, setStep] = useState(1);
  const PILL_STEPS = ["Thông Tin Giao Hàng", "Phương Thức Thanh Toán", "Xác Nhận"];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "credit_card", // or 'momo', 'cod'
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // When no items in cart, redirect back to customize
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/customize');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#FAF6F0",
        overflowX: "hidden",
      }}
    >
      <Navigation cartCount={cartItems.length} forceSolid={true} onCartClick={() => {}} />

      <div style={{ 
        paddingTop: "120px",
        paddingBottom: "80px",
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? "translateY(0px)" : "translateY(50px)", 
        transition: "opacity 1.4s 0.3s, transform 1.4s 0.3s",
        minHeight: "80vh"
      }}>
        <section style={{ background: "#F2EDE4", padding: "3rem 0", overflow: "hidden", minHeight: "800px" }}>
          <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2rem" }}>
            
            <div className="builder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem" }}>
              
              {/* Main Customization Area - replicating BouquetBuilder structure */}
              <div style={{ background: "#FFFFFF", padding: "3rem", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", position: "relative", overflow: "hidden" }}>
                
                {/* Fake floral background inside the card like BouquetBuilder */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "300px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1677682897278-a0565677945a?q=80&w=1600)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1, zIndex: 0, pointerEvents: "none" }} />
                
                <div style={{ position: "relative", zIndex: 1 }}>
                  
                  {/* Step Pills */}
                  {step <= 3 && (
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "2rem" }}>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", color: "#2B3020", marginRight: "1rem", lineHeight: 0.8 }}>Thanh Toán</h2>
                      
                      {PILL_STEPS.map((label, idx) => {
                        const sNum = idx + 1;
                        const isCurrent = step === sNum;
                        const isPast = step > sNum;
                        return (
                          <div key={label} style={{
                            background: isCurrent || isPast ? "rgba(115, 122, 88, 0.15)" : "rgba(0,0,0,0.03)",
                            padding: "0.6rem 1.2rem",
                            borderRadius: "30px",
                            display: "flex", alignItems: "center", gap: "0.5rem",
                            fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: isCurrent || isPast ? "#737a58" : "#A0A0A0", fontWeight: isCurrent ? 600 : 400
                          }}>
                            {label}
                            {isPast && <Check size={16} color="#737a58" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 1: SHIPPING INFO */}
                  {step === 1 && (
                    <div style={{ animation: "fadeIn 0.5s ease" }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#737a58", marginBottom: "1.5rem" }}>
                        Thông Tin Giao Hàng
                      </h3>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                        <div style={{ gridColumn: "1 / -1" }}>
                          <label style={labelStyle}>Họ & Tên</label>
                          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nguyễn Văn A" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Email</label>
                          <input name="email" value={formData.email} onChange={handleInputChange} placeholder="a.nguyen@email.com" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Số Điện Thoại</label>
                          <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+84 90 123 4567" style={inputStyle} />
                        </div>
                        <div style={{ gridColumn: "1 / -1" }}>
                          <label style={labelStyle}>Địa Chỉ</label>
                          <input name="address" value={formData.address} onChange={handleInputChange} placeholder="12 Đường Lê Lợi" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Thành Phố</label>
                          <input name="city" value={formData.city} onChange={handleInputChange} placeholder="Hà Nội" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Mã Bưu Điện</label>
                          <input name="zip" value={formData.zip} onChange={handleInputChange} placeholder="100000" style={inputStyle} />
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3rem" }}>
                         <button 
                            onClick={() => setStep(2)}
                            disabled={!formData.name || !formData.address || !formData.phone}
                            style={{
                              background: (!formData.name || !formData.address || !formData.phone) ? "#ccc" : "#737a58",
                              border: "none", color: "#FAF6F0", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1.2rem 3rem", cursor: (!formData.name || !formData.address || !formData.phone) ? "not-allowed" : "pointer", borderRadius: "5px", transition: "background 0.3s"
                            }}
                          >
                            Tiếp Tục Thanh Toán
                         </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PAYMENT METHOD */}
                  {step === 2 && (
                    <div style={{ animation: "fadeIn 0.5s ease" }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#737a58", marginBottom: "1.5rem" }}>
                        Phương Thức Thanh Toán
                      </h3>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                        {[
                          { id: "credit_card", label: "Thẻ Tín Dụng / Ghi Nợ", icon: <CreditCard size={20} /> },
                          { id: "momo", label: "Ví MoMo", icon: <Wallet size={20} /> },
                          { id: "cod", label: "Thanh Toán Khi Nhận Hàng (COD)", icon: <Banknote size={20} /> },
                        ].map((method) => (
                           <label 
                             key={method.id} 
                             style={{
                               display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem", border: formData.paymentMethod === method.id ? "2px solid #737a58" : "1px solid rgba(0,0,0,0.1)", borderRadius: "10px", cursor: "pointer", background: formData.paymentMethod === method.id ? "rgba(115, 122, 88, 0.05)" : "#FFF", transition: "all 0.2s"
                             }}
                           >
                             <input 
                               type="radio" 
                               name="paymentMethod" 
                               value={method.id} 
                               checked={formData.paymentMethod === method.id} 
                               onChange={handleInputChange} 
                               style={{ width: "1.2rem", height: "1.2rem", accentColor: "#737a58" }} 
                             />
                             <div style={{ color: formData.paymentMethod === method.id ? "#737a58" : "#888" }}>
                               {method.icon}
                             </div>
                             <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: formData.paymentMethod === method.id ? 600 : 400, color: "#2B3020" }}>
                               {method.label}
                             </span>
                           </label>
                        ))}
                      </div>

                      {/* Credit Card Inputs showing conditionally */}
                      {formData.paymentMethod === "credit_card" && (
                        <div style={{ background: "#F9F9F9", padding: "2rem", borderRadius: "10px", marginBottom: "2rem" }}>
                           <div style={{ marginBottom: "1.5rem" }}>
                              <label style={labelStyle}>Số Thẻ</label>
                              <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="4242 4242 4242 4242" style={inputStyle} />
                           </div>
                           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                              <div>
                                <label style={labelStyle}>Ngày Hết Hạn</label>
                                <input name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" style={inputStyle} />
                              </div>
                              <div>
                                <label style={labelStyle}>CVV</label>
                                <input name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" style={inputStyle} type="password" />
                              </div>
                           </div>
                        </div>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
                         <button 
                            onClick={() => setStep(1)}
                            style={{
                              background: "transparent",
                              border: "1px solid #737a58", color: "#737a58", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1.2rem 3rem", cursor: "pointer", borderRadius: "5px", transition: "background 0.3s"
                            }}
                          >
                            Quay Lại
                         </button>
                         <button 
                            onClick={() => setStep(3)}
                            style={{
                              background: "#737a58",
                              border: "none", color: "#FAF6F0", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1.2rem 3rem", cursor: "pointer", borderRadius: "5px", transition: "background 0.3s"
                            }}
                          >
                            Xác Nhận Đơn Hàng
                         </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONFIRMED */}
                  {step === 3 && (
                    <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center", padding: "4rem 2rem" }}>
                      <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "#C4A35A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2.5rem" }}>
                        <Check size={40} color="#FFF" />
                      </div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.5rem", color: "#737a58", marginBottom: "1.5rem" }}>
                        <em>Đặt Hàng Thành Công!</em>
                      </h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: "#8A7A72", lineHeight: 1.8, marginBottom: "2rem" }}>
                        Cảm ơn bạn đã tin tưởng Art de Fleur. Mã đơn hàng của bạn là <strong>#ADF{(Math.random()*100000).toFixed(0)}</strong>.<br />
                        Các nghệ nhân của chúng tôi đang bắt đầu thiết kế bó hoa của bạn ngay lúc này.
                      </p>
                      
                      <div style={{ background: "rgba(196,163,90,0.1)", border: "1px solid rgba(196,163,90,0.3)", padding: "1.5rem", borderRadius: "10px", display: "inline-block", textAlign: "left", marginBottom: "3rem" }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#737a58", marginBottom: "0.5rem" }}>
                          📧 Một email xác nhận đã được gửi cho bạn
                        </p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#737a58" }}>
                          🕐 Giao hàng dự kiến : <strong>Hôm nay, 15H–17H</strong>
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => navigate('/')}
                          style={{
                            background: "#737a58",
                            border: "none",
                            color: "#FAF6F0",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.85rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            padding: "1.2rem 3rem",
                            cursor: "pointer",
                            borderRadius: "5px"
                          }}
                        >
                          Về Trang Chủ
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Sidebar - Order Summary */}
              {(step === 1 || step === 2) && (
                <div style={{ position: "sticky", top: "140px", height: "fit-content" }}>
                  <div style={{ background: "#FFFFFF", padding: "2.5rem 2rem", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#737a58", marginBottom: "2rem", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "1rem" }}>
                      Tóm Tắt Đơn Hàng
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem", maxHeight: "300px", overflowY: "auto" }}>
                      {cartItems.map((item: any, idx: number) => (
                        <div key={idx} style={{ display: "flex", gap: "1rem" }}>
                          <div style={{ width: "60px", height: "60px", background: "linear-gradient(135deg, #F2D4D8, #E8C0C8)", borderRadius: "10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                            🌸
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#2B3020", marginBottom: "0.3rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {item.name}
                            </p>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "#8A7A72", marginBottom: "0.5rem" }}>
                              Số lượng: {item.quantity}
                            </p>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 500, color: "#737a58" }}>
                              {formatVND(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#8A7A72" }}>Tạm tính</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#737a58", fontWeight: 500 }}>{formatVND(subtotal)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#8A7A72" }}>Phí Giao Hàng</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: delivery === 0 ? "#2E7A5C" : "#737a58", fontWeight: 500 }}>
                          {delivery === 0 ? "Miễn phí ✓" : formatVND(delivery)}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", borderTop: "1px dashed rgba(0,0,0,0.1)", paddingTop: "1.5rem" }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 600, color: "#2B3020" }}>Tổng Cộng</span>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "#737a58" }}>{formatVND(total)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trust guarantees similar to checkout/cart drawer */}
                  <div style={{ marginTop: "2rem", background: "rgba(115, 122, 88, 0.05)", padding: "1.5rem", borderRadius: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                      <Shield size={20} color="#737a58" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#2B3020" }}>Bảo mật thanh toán 100%</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <Truck size={20} color="#737a58" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#2B3020" }}>Giao hàng hỏa tốc trong 4H</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

// Consistent styling components
const labelStyle = {
  fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7A72", display: "block", marginBottom: "0.6rem", fontWeight: 500
} as React.CSSProperties;

const inputStyle = {
  width: "100%", padding: "1rem 1.2rem", background: "#FAF6F0", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "#2B3020", outline: "none", transition: "border 0.3s"
} as React.CSSProperties;
