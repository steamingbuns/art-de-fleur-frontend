import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Check, ChevronRight, ChevronLeft, ShoppingBag, Plus, Minus, X } from "lucide-react";

// ——— DATA ———
const formatVND = (price: number | undefined) => {
  if (typeof price !== "number" || isNaN(price)) return "0 VNĐ";
  return price.toLocaleString('vi-VN') + ' VNĐ';
};

const TIERS = [
  { id: "basic", name: "Bó hoa Cơ bản", minStems: 5, maxStems: 7, desc: "Sự khởi đầu tuyệt vời với những bông hoa xinh xắn tinh tế. Lựa chọn hoàn hảo cho những dịp nhẹ nhàng, mang lại cảm giác tươi mới và thanh lịch.", img: "https://plus.unsplash.com/premium_photo-1661636620747-9864306ee1e3?q=80&w=600" },
  { id: "standard", name: "Bó hoa Tiêu chuẩn", minStems: 8, maxStems: 15, desc: "Sự kết hợp hoàn hảo giữa vẻ đẹp trang nhã và sự phong phú. Gửi gắm trọn vẹn tình cảm qua từng cành hoa được tuyển chọn kỹ lưỡng.", img: "https://plus.unsplash.com/premium_photo-1682800180168-abab5d9648b8?q=80&w=600" },
  { id: "premium", name: "Bó hoa Cao cấp", minStems: 13, maxStems: 25, desc: "Trải nghiệm sang trọng với những bông hoa lộng lẫy và đắt giá nhất. Một món quà đẳng cấp thiết kế nguyên bản dành riêng cho người đặc biệt.", img: "https://plus.unsplash.com/premium_photo-1676479853024-06ae7b838894?q=80&w=600" }
];

const FLOWERS: Record<string, any[]> = {
  basic: [
    { id: "baby", name: "Hoa baby", price: 15000, img: "https://plus.unsplash.com/premium_photo-1666621588981-65d8218bfc38?q=80&w=400" },
    { id: "tana", name: "Hoa cúc tana", price: 20000, img: "https://plus.unsplash.com/premium_photo-1667867937010-77fd5161cf8d?q=80&w=400" },
    { id: "statice", name: "Hoa sao tím", price: 25000, img: "https://plus.unsplash.com/premium_photo-1764258557889-5e5df466d68e?q=80&w=400" },
    { id: "carnation", name: "Hoa cẩm chướng", price: 35000, img: "https://plus.unsplash.com/premium_photo-1677178629088-ba7d3a23049a?q=80&w=400" },
    { id: "gerbera", name: "Hoa đồng tiền", price: 35000, img: "https://plus.unsplash.com/premium_photo-1723708803755-b5f72631ab48?q=80&w=400" },
    { id: "heathbell", name: "Hoa thạch thảo", price: 25000, img: "https://plus.unsplash.com/premium_photo-1720524513100-2fa5f656272f?q=80&w=400" },
    { id: "pingpong", name: "Hoa cúc ping pong", price: 30000, img: "https://plus.unsplash.com/premium_photo-1721317368393-09204f05aab5?q=80&w=400" }
  ],
  standard: [
    { id: "rose", name: "Hoa hồng Đà Lạt", price: 50000, img: "https://plus.unsplash.com/premium_photo-1673716788461-0aa43e5d2015?q=80&w=400" },
    { id: "sunflower", name: "Hoa hướng dương", price: 47500, img: "https://plus.unsplash.com/premium_photo-1688045802023-60a42a082776?q=80&w=400" },
    { id: "lisianthus", name: "Hoa cát tường", price: 60000, img: "https://plus.unsplash.com/premium_photo-1661611134994-ea692684c976?q=80&w=400" },
    { id: "ranunculus", name: "Hoa mao lương", price: 80000, img: "https://plus.unsplash.com/premium_photo-1682800180168-abab5d9648b8?q=80&w=400" },
    { id: "wax", name: "Hoa thanh liễu", price: 50000, img: "https://plus.unsplash.com/premium_photo-1661427503852-5e2700754174?q=80&w=400" },
    { id: "chrysanthemum_peony", name: "Hoa cúc mẫu đơn", price: 47500, img: "https://plus.unsplash.com/premium_photo-1769006095512-da1a45e5e55e?q=80&w=400" },
    { id: "violet", name: "Hoa violet", price: 60000, img: "https://plus.unsplash.com/premium_photo-1667867937010-77fd5161cf8d?q=80&w=400" },
    { id: "freesias", name: "Hoa freesias", price: 70000, img: "https://plus.unsplash.com/premium_photo-1764258557889-5e5df466d68e?q=80&w=400" }
  ],
  premium: [
    { id: "tulip", name: "Hoa Tulip", price: 105000, img: "https://plus.unsplash.com/premium_photo-1661427503852-5e2700754174?q=80&w=400" },
    { id: "lily", name: "Hoa Lily", price: 107500, img: "https://plus.unsplash.com/premium_photo-1676068243733-df1880c2aef8?q=80&w=400" },
    { id: "hydrangea", name: "Hoa cẩm tú cầu", price: 130000, img: "https://plus.unsplash.com/premium_photo-1668073436953-492767f88b8d?q=80&w=400" },
    { id: "mini_orchid", name: "Hoa lan hồ điệp mini", price: 150000, img: "https://plus.unsplash.com/premium_photo-1673931249523-69dcbace086b?q=80&w=400" },
    { id: "peony", name: "Hoa mẫu đơn", price: 185000, img: "https://plus.unsplash.com/premium_photo-1661346020292-a39c04af8e20?q=80&w=400" },
    { id: "protea", name: "Hoa protea", price: 215000, img: "https://plus.unsplash.com/premium_photo-1688045802023-60a42a082776?q=80&w=400" },
    { id: "calla_lily", name: "Hoa calla lily", price: 145000, img: "https://plus.unsplash.com/premium_photo-1663133537288-5b9044e326a0?q=80&w=400" },
    { id: "anthurium", name: "Hoa anthurium", price: 135000, img: "https://plus.unsplash.com/premium_photo-1677178629088-ba7d3a23049a?q=80&w=400" }
  ]
};

const WRAPPINGS = [
  { id: "frosted", name: "Giấy Bóng Kính Mờ", img: "https://plus.unsplash.com/premium_photo-1770384361940-f991d8c9f715?q=80&w=400" },
  { id: "tulle", name: "Giấy Lưới", img: "https://plus.unsplash.com/premium_photo-1704915934141-87da72ee5e43?q=80&w=400" },
  { id: "vintage", name: "Giấy Báo Cổ Điển", img: "https://plus.unsplash.com/premium_photo-1672944876342-4090164e1c04?q=80&w=400" },
  { id: "silk", name: "Giấy Gói Lưới Lụa", img: "https://images.unsplash.com/photo-1633903422938-8291a4606408?q=80&w=400" }
];

const DECORATIONS = [
  { id: "ribbon", name: "Ruy Băng", img: "https://plus.unsplash.com/premium_photo-1740426075438-78a931e19ce1?q=80&w=400" },
  { id: "foliage", name: "Lá Trang Trí", img: "https://plus.unsplash.com/premium_photo-1661326215888-206abbebd313?q=80&w=400" },
  { id: "filler", name: "Hoa Phụ/Hoa Nhỏ", img: "https://plus.unsplash.com/premium_photo-1769006095512-da1a45e5e55e?q=80&w=400" },
  { id: "picks", name: "Que Cắm Trang Trí", img: "https://plus.unsplash.com/premium_photo-1726812311448-b721dd8efaea?q=80&w=400" },
  { id: "cards", name: "Thiệp Viết Tay", img: "https://plus.unsplash.com/premium_photo-1663133537288-5b9044e326a0?q=80&w=400" }
];

const PREVIEWS: Record<string, any[]> = {
  basic: [
    { id: "type1", name: "TYPE 1", img: "https://plus.unsplash.com/premium_photo-1676479853024-06ae7b838894?q=80&w=600" },
    { id: "type2", name: "TYPE 2", img: "https://plus.unsplash.com/premium_photo-1661636620747-9864306ee1e3?q=80&w=600" },
    { id: "type3", name: "TYPE 3", img: "https://plus.unsplash.com/premium_photo-1682800180168-abab5d9648b8?q=80&w=600" }
  ],
  standard: [
    { id: "type1", name: "TYPE 1", img: "https://plus.unsplash.com/premium_photo-1677178629088-ba7d3a23049a?q=80&w=600" },
    { id: "type2", name: "TYPE 2", img: "https://plus.unsplash.com/premium_photo-1769006095512-da1a45e5e55e?q=80&w=600" },
    { id: "type3", name: "TYPE 3", img: "https://plus.unsplash.com/premium_photo-1676068243733-df1880c2aef8?q=80&w=600" }
  ],
  premium: [
    { id: "type1", name: "TYPE 1", img: "https://plus.unsplash.com/premium_photo-1661427503852-5e2700754174?q=80&w=600" },
    { id: "type2", name: "TYPE 2", img: "https://plus.unsplash.com/premium_photo-1661611134994-ea692684c976?q=80&w=600" },
    { id: "type3", name: "TYPE 3", img: "https://plus.unsplash.com/premium_photo-1668073436953-492767f88b8d?q=80&w=600" }
  ]
};

interface Selection {
  productType: "bouquet" | "gift_box" | "";
  tier: string;
  flowerCounts: Record<string, number>;
  wrapping: string;
  decorations: string[];
  previewType: string;
  hasCard: boolean;
  cardSender: string;
  cardName: string;
  cardMessage: string;
}

interface BouquetBuilderProps {
  onAddToCart: (item: string, price: number) => void;
  type?: "bouquet" | "gift_box";
}

export function BouquetBuilder({ onAddToCart, type }: BouquetBuilderProps) {
  const [step, setStep] = useState(type === "bouquet" ? 0 : (type ? 1 : 0));
  const [previewTier, setPreviewTier] = useState<string | null>(null);
  const [selection, setSelection] = useState<Selection>({
    productType: type || "",
    tier: "",
    flowerCounts: {},
    wrapping: "",
    decorations: [],
    previewType: "",
    hasCard: false,
    cardSender: "",
    cardName: "",
    cardMessage: "",
  });
  const [completed, setCompleted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (contentRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
           setHeight((entry.target as HTMLElement).offsetHeight);
        }
      });
      observer.observe(contentRef.current);
      return () => observer.disconnect();
    }
  }, [step, previewTier]);

  // Compute currently utilized stems
  const currentStems = Object.values(selection.flowerCounts).reduce((a, b) => a + b, 0);
  const currentTierObj = TIERS.find(t => t.id === selection.tier);

  const price = useMemo(() => {
    if (selection.productType === "gift_box") return 210000;
    let total = 0;
    if (selection.tier && FLOWERS[selection.tier]) {
      Object.entries(selection.flowerCounts).forEach(([fId, qty]) => {
        const flower = FLOWERS[selection.tier].find(f => f.id === fId);
        if (flower) total += flower.price * qty;
      });
      if (selection.wrapping) {
        if (selection.tier === 'basic') total += 30000;
        else if (selection.tier === 'standard') total += 40000;
        else if (selection.tier === 'premium') total += 60000;
      }
      if (selection.decorations.length >= 3) {
        if (selection.tier === 'basic') total += 30000;
        else if (selection.tier === 'standard') total += 50000;
        else if (selection.tier === 'premium') total += 80000;
      }
    }
    return total;
  }, [selection]);

  const PILL_STEPS = ["Chọn hoa của bạn", "Chọn giấy gói", "Chọn phụ kiện trang trí"];

  const handleAddToCart = () => {
    let name = "Hộp Quà Hoa (Flower Gift Box)";
    if (selection.productType === "bouquet" && selection.tier) {
      name = `${currentTierObj?.name} - ${(selection.previewType || "").toUpperCase()}`;
    }
    onAddToCart(name, price);
    setCompleted(true);
  };

  const addFlower = (id: string) => {
    if (!currentTierObj || currentStems >= currentTierObj.maxStems) return;
    setSelection(prev => ({
      ...prev,
      flowerCounts: {
        ...prev.flowerCounts,
        [id]: (prev.flowerCounts[id] || 0) + 1
      }
    }));
  };

  const removeFlower = (id: string) => {
    if (!selection.flowerCounts[id]) return;
    setSelection(prev => {
      const copy = { ...prev.flowerCounts };
      copy[id] -= 1;
      if (copy[id] <= 0) delete copy[id];
      return { ...prev, flowerCounts: copy };
    });
  };

  const toggleDecoration = (id: string) => {
    setSelection(prev => {
      const exists = prev.decorations.includes(id);
      if (exists) {
        return { ...prev, decorations: prev.decorations.filter(d => d !== id) };
      }
      if (prev.decorations.length < 3) {
        return { ...prev, decorations: [...prev.decorations, id] };
      }
      return prev;
    });
  };

  if (completed) {
    return (
      <section id="builder" style={{ background: "#F5EFE6", padding: "7rem 2rem" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#4A3B32", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <Check size={36} color="#FAF6F0" />
          </div>
          <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "4rem", color: "#4A3B32", marginBottom: "1rem" }}>Cảm Ơn Bạn!</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(74,59,50,0.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Tuyệt tác nghệ thuật của bạn đã được thêm vào giỏ hàng.
          </p>
          <button
            onClick={() => {
              setCompleted(false);
              setStep(type === "bouquet" ? 0 : (type ? 1 : 0));
              setSelection({ productType: type || "", tier: "", flowerCounts: {}, wrapping: "", decorations: [], previewType: "", hasCard: false, cardSender: "", cardName: "", cardMessage: "" });
            }}
            style={{ background: "#4A3B32", border: "none", color: "#FAF6F0", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", padding: "0.9rem 2.5rem", cursor: "pointer" }}
          >
            Tạo Sản Phẩm Khác
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="builder" style={{ background: "#F2EDE4", padding: "3rem 0", overflow: "hidden", minHeight: "800px" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 2rem" }}>
        
        {/* If bouquet format, render the overhauled UI */}
        {selection.productType === "bouquet" && (
          <div className="builder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>
            
            {/* Main Area */}
            <div style={{ background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", position: "relative", overflow: "hidden", transition: "height 0.5s ease", height: height === "auto" ? "auto" : height }}>
              <div ref={contentRef} style={{ padding: "2rem", position: "relative" }}>
                
                {/* Fake floral background inside the card */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "200px", backgroundImage: "url(https://plus.unsplash.com/premium_photo-1677682897278-a0565677945a?q=80&w=1600)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, zIndex: 0, pointerEvents: "none" }} />
                
                <div style={{ position: "relative", zIndex: 1 }}>
                {/* STEP 0: TIER SELECTION */}
                {step === 0 && (
                  <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
                    <div style={{ background: "#FFFFFF", padding: "1rem 3rem", borderRadius: "40px", display: "inline-block", border: "1px solid rgba(0,0,0,0.05)", marginBottom: "1rem", marginTop: "2rem" }}>
                      <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.5rem", color: "#2B3020", margin: 0, lineHeight: 1 }}>
                        Tạo tác phẩm hoa của riêng bạn
                      </h2>
                    </div>
                  </div>
                )}

                {step === 0 && !previewTier && (
                  <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
                      {TIERS.map(tier => (
                        <div key={tier.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", transition: "transform 0.3s ease" }}
                             onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                             onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                             onClick={() => setPreviewTier(tier.id)}
                        >
                          <img src={tier.img} style={{ width: "220px", height: "220px", objectFit: "cover", borderRadius: "50%", border: "8px solid #FFF", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }} alt={tier.name} />
                          <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2.8rem", color: "#2B3020", marginTop: "1rem" }}>{tier.name}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 0 && previewTier && (
                  <div style={{ display: "flex", gap: "3rem", alignItems: "center", animation: "slideLeft 0.5s ease", padding: "2rem 0" }}>
                    {(() => {
                      const tier = TIERS.find(t => t.id === previewTier);
                      if (!tier) return null;
                      return (
                        <>
                          <div style={{ flex: "0 0 380px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img src={tier.img} style={{ width: "280px", height: "280px", objectFit: "cover", borderRadius: "50%", border: "8px solid #FFF", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }} alt={tier.name} />
                            <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.2rem", color: "#2B3020", marginTop: "1.5rem", textAlign: "center", whiteSpace: "nowrap" }}>{tier.name}</h3>
                          </div>
                          <div style={{ flex: "1", animation: "fadeIn 0.8s ease 0.2s both" }}>
                            <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", color: "#4A3B32", marginBottom: "1.5rem" }}>Khám phá {tier.name}</h4>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", lineHeight: 1.8, color: "#555", marginBottom: "1.5rem" }}>
                              {tier.desc}
                            </p>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#4A3B32", marginBottom: "2.5rem" }}>
                              Số lượng cành: {tier.minStems} - {tier.maxStems} cành
                            </p>
                            <div style={{ display: "flex", gap: "1rem" }}>
                              <button onClick={() => { setPreviewTier(null); setSelection(s => ({ ...s, tier: "", flowerCounts: {}, wrapping: "", decorations: [], previewType: "" })); setStep(0); }} style={{ padding: "0.8rem 2rem", background: "transparent", border: "1px solid #4A3B32", color: "#4A3B32", borderRadius: "30px", fontFamily: "'Inter', sans-serif", fontWeight: 500, cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(74,59,50,0.05)"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>Quay lại</button>
                              <button onClick={() => { setSelection(s => ({ ...s, tier: tier.id, flowerCounts: {}, wrapping: "", decorations: [], previewType: "" })); setStep(1); }} style={{ padding: "0.8rem 2rem", background: "#4A3B32", border: "none", color: "#FFF", borderRadius: "30px", fontFamily: "'Inter', sans-serif", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", transition: "all 0.3s ease" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>Bắt đầu thiết kế <ChevronRight size={18} /></button>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* STEP 1-3: CUSTOMIZATION */}
                {step >= 1 && step <= 3 && currentTierObj && (
                  <div style={{ animation: "fadeIn 0.5s ease" }}>
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", alignItems: "center", flexWrap: "wrap" }}>
                      <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.5rem", color: "#2B3020", marginRight: "1rem", lineHeight: 0.8 }}>{currentTierObj.name}</h2>
                      
                      {PILL_STEPS.map((label, idx) => {
                        const sNum = idx + 1;
                        const isCurrent = step === sNum;
                        const isPast = step > sNum;
                        return (
                          <div key={label} style={{
                            background: isCurrent || isPast ? "rgba(74, 59, 50, 0.1)" : "rgba(0,0,0,0.03)",
                            padding: "0.6rem 1.2rem",
                            borderRadius: "30px",
                            display: "flex", alignItems: "center", gap: "0.5rem",
                            fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#2B3020", fontWeight: isCurrent ? 500 : 400
                          }}>
                            {label}
                            {isPast && <Check size={16} color="#4A3B32" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* STEP 1: FLOWERS */}
                    {step === 1 && (
                      <div style={{ padding: "0 1rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
                          {FLOWERS[selection.tier]?.map(flower => {
                            const count = selection.flowerCounts[flower.id] || 0;
                            return (
                              <div key={flower.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "0.5rem", padding: "0 0.5rem" }}>
                                  <button onClick={() => removeFlower(flower.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8BB2C9" }}><Minus size={28} strokeWidth={3} /></button>
                                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: "#4A3B32" }}>{count}</span>
                                  <button onClick={() => addFlower(flower.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7BA896" }}><Plus size={28} strokeWidth={3} /></button>
                                </div>
                                <img src={flower.img} alt={flower.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", border: "4px solid #FFF", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }} />
                                <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem", textAlign: "center", marginTop: "0.5rem", color: "#2B3020" }}>{flower.name}</div>
                              </div>
                            );
                          })}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#4A3B32", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                              Số lượng tối thiểu: {currentTierObj.minStems} <span style={{fontWeight: 400, color: "#888", marginLeft: "10px"}}>(Đã chọn: {currentStems})</span>
                            </div>
                            {currentStems < currentTierObj.minStems && (
                              <span style={{ fontSize: "0.85rem", color: "#e63946", fontWeight: 400 }}>
                                * Vui lòng chọn ít nhất {currentTierObj.minStems} cành hoa
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: WRAPPING */}
                    {step === 2 && (
                       <div style={{ padding: "0 1rem" }}>
                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                         <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#4A3B32" }}>
                             Chọn loại giấy gói
                         </div>
                         {!selection.wrapping && (
                           <span style={{ fontSize: "0.85rem", color: "#e63946", fontWeight: 400 }}>
                             * Vui lòng chọn 1 loại giấy gói
                           </span>
                         )}
                       </div>
                       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>
                         {WRAPPINGS.map(wrap => (
                           <div key={wrap.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", opacity: (!selection.wrapping || selection.wrapping === wrap.id) ? 1 : 0.5, transition: "all 0.3s" }} 
                                onClick={() => setSelection(prev => ({ ...prev, wrapping: wrap.id }))}>
                             <div style={{ position: "relative" }}>
                                <img src={wrap.img} alt={wrap.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }} />
                                {selection.wrapping === wrap.id && <div style={{ position:"absolute", top: -10, right: -10, background:"#7BA896", color:"#FFF", borderRadius:"50%", padding:"5px" }}><Check size={20}/></div>}
                             </div>
                             <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", fontWeight: 500, textAlign: "center", marginTop: "1rem", color: "#2B3020" }}>{wrap.name}</div>
                           </div>
                         ))}
                       </div>
                     </div>
                    )}

                    {/* STEP 3: DECORATION */}
                    {step === 3 && (
                       <div style={{ padding: "0 1rem" }}>
                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                         <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", fontWeight: 600, color: "#4A3B32" }}>
                            Chọn 3 trong số 5
                         </div>
                         {selection.decorations.length < 3 && (
                           <span style={{ fontSize: "0.85rem", color: "#e63946", fontWeight: 400 }}>
                             * Vui lòng chọn đủ 3 phụ kiện
                           </span>
                         )}
                       </div>
                       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", marginBottom: "3rem" }}>
                         {DECORATIONS.map(dec => {
                           const isSelected = selection.decorations.includes(dec.id);
                           const isDisabled = !isSelected && selection.decorations.length >= 3;
                           return (
                            <div key={dec.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: isDisabled ? "default" : "pointer", opacity: isDisabled ? 0.4 : 1, width: "200px", transition: "all 0.3s" }} 
                                 onClick={() => { if(!isDisabled || isSelected) toggleDecoration(dec.id); }}>
                              <div style={{ position: "relative" }}>
                                  <img src={dec.img} alt={dec.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }} />
                                  {isSelected && <div style={{ position:"absolute", top: -10, right: -10, background:"#7BA896", color:"#FFF", borderRadius:"50%", padding:"5px" }}><Check size={20}/></div>}
                              </div>
                              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 500, textAlign: "center", marginTop: "1rem", color: "#2B3020", lineHeight: 1.4 }}>{dec.name}</div>
                            </div>
                           )
                         })}
                       </div>
                     </div>
                    )}
                    
                    {/* Navigation Buttons */}
                    {(() => {
                      const isNextDisabled =
                        (step === 1 && currentStems < currentTierObj.minStems) ||
                        (step === 2 && !selection.wrapping) ||
                        (step === 3 && selection.decorations.length < 3);

                      return (
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4rem", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "2rem" }}>
                          <button onClick={() => {
                            if (step === 1) {
                              setSelection(s => ({ ...s, tier: "", flowerCounts: {}, wrapping: "", decorations: [], previewType: "" })); setPreviewTier(null); setStep(0);
                            } else {
                              setStep(step - 1);
                            }
                          }} style={{ background: "transparent", border: "1px solid #4A3B32", color: "#4A3B32", padding: "0.8rem 2rem", borderRadius: "30px", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <ChevronLeft size={18} /> Quay lại
                            </button>
                            <button disabled={isNextDisabled} onClick={() => setStep(step + 1)} style={{ background: isNextDisabled ? "#ccc" : "#9A715B", border: "none", color: "#FFF", padding: "0.8rem 2rem", borderRadius: "30px", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", cursor: isNextDisabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.5rem", transition: "all 0.3s" }}>
                              {step === 3 ? "XEM TRƯỚC" : "Bước tiếp theo"} <ChevronRight size={18} />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* STEP 4: PREVIEW */}
                {step === 4 && currentTierObj && (
                  <div style={{ animation: "fadeIn 0.5s ease", textAlign: "center" }}>
                     <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#2B3020", margin: 0, marginBottom: "1rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>XEM TRƯỚC</h2>
                     <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "3.5rem", color: "#2B3020", margin: 0, marginBottom: "3rem" }}>{currentTierObj.name}</h3>

                     <div style={{ display: "flex", justifyContent: "space-between", gap: "2rem", marginBottom: "3rem", padding: "0 1rem" }}>
                        {PREVIEWS[selection.tier]?.map((preview, i) => (
                          <div key={preview.id} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }} onClick={()=>setSelection(s => ({...s, previewType: preview.id}))}>
                             <img src={preview.img} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: "10px", boxShadow: selection.previewType===preview.id ? "0 10px 30px rgba(0,0,0,0.2)" : "0 5px 15px rgba(0,0,0,0.05)", transform: selection.previewType===preview.id ? "scale(1.05)" : "scale(1)", transition: "all 0.3s", border: selection.previewType===preview.id ? "4px solid #FFF" : "none" }} />
                             <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#2B3020", marginTop: "1.5rem" }}>TYPE {i + 1}</div>
                          </div>
                        ))}
                     </div>
                     
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "2rem", marginTop: "2rem" }}>
                        <button onClick={() => setStep(3)} style={{ background: "transparent", border: "1px solid #4A3B32", color: "#4A3B32", padding: "0.8rem 2rem", borderRadius: "30px", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <ChevronLeft size={18} /> Chỉnh sửa lựa chọn
                          </button>

                          <button disabled={!selection.previewType} onClick={handleAddToCart} style={{ background: !selection.previewType ? "#ccc" : "#48533C", border: "none", color: "#FAF6F0", fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 3rem", borderRadius: "40px", cursor: !selection.previewType ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.8rem", fontWeight: 600, boxShadow: !selection.previewType ? "none" : "0 10px 20px rgba(72,83,60,0.3)", transition: "all 0.3s" }}>
                            <ShoppingBag size={20} /> THÊM VÀO GIỎ HÀNG
                        </button>
                     </div>
                  </div>
                )}
              </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div style={{ padding: "2rem", background: "#FFFFFF", height: "fit-content", position: "sticky", top: "100px", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)" }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#4A3B32", marginBottom: "1.5rem", borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: "1rem", fontWeight: 600 }}>Cấu trúc món quà</h4>

              {step === 0 ? (
                 <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#888" }}>Vui lòng chọn phân khúc để bắt đầu.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#888", textTransform: "uppercase" }}>Phân Khúc</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#4A3B32", fontWeight: 500 }}>{currentTierObj?.name}</span>
                  </div>

                  {step >= 1 && currentStems > 0 && (
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#888", textTransform: "uppercase" }}>Hoa đã chọn</span>
                        <div style={{ textAlign: "right" }}>
                           {Object.entries(selection.flowerCounts).map(([fid, qty]) => {
                              const fObj = FLOWERS[selection.tier]?.find(f=>f.id===fid);
                              return fObj ? <div key={fid} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#4A3B32", marginBottom: "4px" }}>{qty}x {fObj.name}</div> : null;
                           })}
                        </div>
                     </div>
                  )}

                  {step >= 3 && selection.wrapping && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#888", textTransform: "uppercase" }}>Giấy Gói</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#4A3B32", textAlign: "right" }}>{WRAPPINGS.find(w=>w.id===selection.wrapping)?.name}</span>
                    </div>
                  )}
                  
                  {step >= 4 && selection.decorations.length > 0 && (
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#888", textTransform: "uppercase", maxWidth: "40%" }}>Phụ Kiện</span>
                        <div style={{ textAlign: "right" }}>
                           {selection.decorations.map(did => {
                              const dObj = DECORATIONS.find(d=>d.id===did);
                              return dObj ? <div key={did} style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#4A3B32", marginBottom: "4px" }}>{dObj.name}</div> : null;
                           })}
                        </div>
                     </div>
                  )}
                </div>
              )}

              <div style={{ borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#4A3B32", fontWeight: 600 }}>Tạm tính</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.5rem", color: "#9A715B", fontWeight: 600 }}>{formatVND(price)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Fallback old flow for Gift Box (Simplified to not break) */}
        {selection.productType === "gift_box" && (
           <div style={{textAlign: "center", padding: "4rem"}}>
              <h2 style={{fontFamily: "'Great Vibes', cursive", fontSize: "4rem"}}>Gift Box Builder</h2>
              <p style={{fontFamily: "'Inter', sans-serif", margin: "2rem"}}>Gift boxes coming soon!</p>
              <button onClick={handleAddToCart} style={{ background: "#48533C", border: "none", color: "#FAF6F0", fontSize: "1rem", padding: "1rem 3rem", borderRadius: "40px", cursor: "pointer"}}>Add Standard Gift Box</button>
           </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideLeft { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  );
}


