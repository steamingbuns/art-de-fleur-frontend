import { useEffect, useRef, useState } from "react";
import { Leaf, Heart, Star, Zap, Globe, Shield } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const values = [
  {
    icon: <Leaf size={20} />,
    title: "Bền Vững & Tận Tâm",
    titleEn: "Nguồn gốc thanh sạch",
    desc: "100% hoa của chúng tôi được thu hoạch từ các nông trại đạt chuẩn bền vững. Hướng tới trung hòa carbon năm 2025 cùng với bao bì sinh học 100%.",
    accent: "#2E7A5C",
  },
  {
    icon: <Heart size={20} />,
    title: "Kiệt Tác Thủ Công",
    titleEn: "Chế tác từ trái tim",
    desc: "Mỗi bó hoa đều được thiết kế thủ công bởi những nghệ nhân xuất thân từ Paris — tuyệt đối không qua máy móc, ôm trọn những dấu chạm tinh tế của nghệ thuật cắm hoa.",
    accent: "#8B1A3A",
  },
  {
    icon: <Star size={20} />,
    title: "Hoa Thượng Hạng",
    titleEn: "Chỉ chọn lọc tinh túy",
    desc: "Chúng tôi chỉ chọn giữ lại chưa đến 8% lượng hoa từ chợ Rungis. Chỉ những đóa hoa tuyệt mỹ nhất mới được phép tỏa sáng trong tác phẩm của bạn.",
    accent: "#C4A35A",
  },
  {
    icon: <Zap size={20} />,
    title: "Chuyển Phát Tốc Hành",
    titleEn: "Giao nhận trong 4 tiếng",
    desc: "Đặt trước 3h chiều để nhận hoa ngay trong ngày. Tươi mới, trao tận tay, và luôn được gói ghém theo phong cách trứ danh đầy thanh lịch — bất kể thời khắc nào.",
    accent: "#7B68A5",
  },
  {
    icon: <Globe size={20} />,
    title: "Tầm Nhìn Lục Địa",
    titleEn: "Vươn mình ra thế giới",
    desc: "Từ những cánh đồng hoa hồng Ecuador cho đến thủ phủ tulip Hà Lan, mạng lưới của chúng tôi trải dài 22 quốc gia để mang về những cánh hoa tinh hoa nhất.",
    accent: "#1B6B8A",
  },
  {
    icon: <Shield size={20} />,
    title: "Bảo Chứng Tươi Mới",
    titleEn: "Cam kết bung nở",
    desc: "Chưa vừa ý với độ bung nở rực rỡ của những đóa hoa? Chúng tôi sẽ thay thế tác phẩm mới cho bạn trong vòng 24 giờ — mà không cần bất kỳ câu hỏi nào.",
    accent: "#5A3E8A",
  },
];

const testimonials = [
  {
    name: "Camille D.",
    location: "Paris 6e",
    text: "Bó hoa đã khiến mẹ tôi rơi những giọt nước mắt hạnh phúc. Đó chính xác là những gì bà xứng đáng nhận được — một món quà quá đỗi diệu kỳ.",
    rating: 5,
  },
  {
    name: "Alex M.",
    location: "Marais, Paris",
    text: "Tính năng tự thiết kế bó hoa đem lại cảm giác như đang là một người nghệ sĩ. Chưa bao giờ tôi dám nghĩ mình có thể tạo ra một tác phẩm xinh đẹp đến thế.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Saint-Germain",
    text: "Giao hàng chỉ trong vỏn vẹn 3 tiếng, bao bì hoàn mỹ không tì vết, và những dòng thông điệp viết tay tuyệt đẹp. Một phép màu đích thực.",
    rating: 5,
  },
  {
    name: "Sophie T.",
    location: "Lyon, France",
    text: "Sự tinh tế trong từng cách phối màu và chọn hoa. Tôi chưa từng thấy dịch vụ nào chu đáo và chuyên nghiệp đến vậy. Hoàn toàn xứng đáng với tầm giá và kỳ vọng.",
    rating: 5,
  },
];

export function BrandValues() {
  const { ref, inView } = useInView();
  const { ref: testRef, inView: testInView } = useInView();

  return (
    <section id="values" style={{ background: "#2B3020", overflow: "hidden" }}>
      {/* Values grid */}
      <div
        ref={ref}
        style={{ maxWidth: "1600px", margin: "0 auto", padding: "6rem 4rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C4A35A",
              marginBottom: "1rem",
            }}
          >
            Cam kết của chúng tôi
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              color: "#FAF6F0",
              lineHeight: 1.1,
            }}
          >
            Triết Lý Của <em style={{ fontStyle: "italic", color: "#C4A35A" }}>Art de Fleur</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {values.map((v, i) => (
            <div
              key={v.title}
              style={{
                border: "1px solid rgba(250,246,240,0.07)",
                padding: "2.5rem",
                position: "relative",
                overflow: "hidden",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(30px)",
                transition: `all 0.8s ease ${i * 0.1}s`,
              }}
            >
              {/* Subtle background glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: v.accent,
                }}
              />

              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: `1px solid ${v.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: v.accent,
                  marginBottom: "1.5rem",
                }}
              >
                {v.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "#FAF6F0",
                  marginBottom: "0.3rem",
                  lineHeight: 1.2,
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: v.accent,
                  marginBottom: "1rem",
                  fontWeight: 300,
                }}
              >
                {v.titleEn}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(250,246,240,0.55)",
                  lineHeight: 1.85,
                  fontWeight: 300,
                }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid rgba(250,246,240,0.06)" }} />

      {/* Testimonials */}
      <div
        ref={testRef}
        style={{ maxWidth: "1600px", margin: "0 auto", padding: "6rem 4rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C4A35A",
              marginBottom: "1rem",
            }}
          >
            Khách Hàng Chia Sẻ
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "#FAF6F0",
              lineHeight: 1.15,
            }}
          >
            Những Cảm Xúc <em style={{ fontStyle: "italic" }}>Chân Thực Nhất</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{
                border: "1px solid rgba(196,163,90,0.15)",
                padding: "2.5rem",
                position: "relative",
                opacity: testInView ? 1 : 0,
                transform: testInView ? "none" : "translateY(20px)",
                transition: `all 0.8s ease ${i * 0.15}s`,
              }}
            >
              {/* Quote mark */}
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "5rem",
                  color: "rgba(196,163,90,0.15)",
                  position: "absolute",
                  top: "1rem",
                  right: "1.5rem",
                  lineHeight: 1,
                }}
              >
                "
              </span>

              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "1.2rem" }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} fill="#C4A35A" color="#C4A35A" />
                ))}
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#FAF6F0",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                "{t.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #737a58, #C4A35A)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#FAF6F0", fontWeight: 500 }}>
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#FAF6F0", display: "block", fontWeight: 400 }}>
                    {t.name}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(196,163,90,0.6)", letterSpacing: "0.08em" }}>
                    {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            marginTop: "5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "4.9", label: "Đánh Giá Trung Bình" },
            { num: "12K+", label: "Khách Hàng Thân Thiết" },
            { num: "4.2T", label: "Lượt Xem TikTok" },
            { num: "98K", label: "Người Theo Dõi Instagram" },
          ].map((s) => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 500, color: "#C4A35A", display: "block" }}>
                {s.num}
              </span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,246,240,0.4)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
