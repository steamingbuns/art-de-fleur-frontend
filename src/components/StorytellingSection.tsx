import { useEffect, useRef, useState } from "react";

const ATELIER_IMAGE =
  "https://images.unsplash.com/photo-1700699071751-38a95e816f60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";
const LIFESTYLE_IMAGE =
  "https://images.unsplash.com/photo-1646505294346-65a31344d52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";
const STUDIO_IMAGE =
  "https://images.unsplash.com/photo-1629804360430-7f8bb047e7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80";

function useInView(threshold = 0.2) {
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

export function StorytellingSection() {
  const { ref: ref1, inView: in1 } = useInView();
  const { ref: ref2, inView: in2 } = useInView();
  const { ref: ref3, inView: in3 } = useInView();

  return (
    <section id="story" style={{ background: "#FAF6F0", overflow: "hidden" }}>

      {/* Editorial split — Atelier story */}
      <div
        ref={ref1}
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 5fr",
          minHeight: "600px",
        }}
        className="story-split"
      >
        {/* Image */}
        <div
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src={ATELIER_IMAGE}
            alt="Art de Fleur Atelier Paris"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: in1 ? "scale(1)" : "scale(1.08)",
              transition: "transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(115, 122, 88,0.15)",
            }}
          />
        </div>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "6rem 5rem",
            background: "#737a58",
          }}
          className="story-text-pad"
        >
          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(4.5rem, 8vw, 6.5rem)",
              color: "#FAF6F0",
              marginBottom: "2.5rem",
              fontWeight: 400,
              lineHeight: 1,
              opacity: in1 ? 1 : 0,
              transform: in1 ? "none" : "translateY(20px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            Về chúng tôi
          </h1>
          
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", color: "rgba(250,246,240,0.9)", lineHeight: 1.6, fontWeight: 400, textAlign: "justify", opacity: in1 ? 1 : 0, transform: in1 ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.3s" }}>
              Chào bạn, chào mừng đến với Art de Fleur.<br/>
              Trong tiếng Pháp, "Art" mang ý nghĩa là nghệ thuật, còn "Fleur" là những bông hoa. 
              Chúng mình chọn cái tên này với một niềm tin giản dị: Mỗi bó hoa không nên chỉ là một 
              món đồ trang trí vô tri, mà phải là một tác phẩm nghệ thuật có hồn. Mang trong mình 
              cảm hứng về một nước Pháp thanh lịch và tinh tế, Art de Fleur ra đời để định nghĩa lại 
              cách chúng ta trao gửi yêu thương qua những đóa hoa.
            </p>
          </div>

          <div style={{ textAlign: "center", marginBottom: "2.5rem", opacity: in1 ? 1 : 0, transform: in1 ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.4s" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3.2rem", fontStyle: "italic", color: "#C4A35A", fontWeight: 600 }}>
              “Emotion - Enthusiasm - Elegance”
            </h2>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {/* Mission */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", justifySelf: "flex-start", opacity: in1 ? 1 : 0, transform: in1 ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.5s" }}>
              <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "4.5rem", color: "#FAF6F0", margin: 0, fontWeight: 400, flexShrink: 0, lineHeight: 0.8 }}>
                Sứ mệnh
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", color: "rgba(250,246,240,0.9)", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                Mang đến trải nghiệm tự tay thiết kế hoa mang đậm dấu ấn cá nhân thông 
                qua một nền tảng thương mại điện tử đột phá, nhằm gói trọn ba yếu tố vào 
                mỗi món quà.
              </p>
            </div>

            {/* Vision */}
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", textAlign: "right", justifyContent: "flex-end", opacity: in1 ? 1 : 0, transform: in1 ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.6s" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", color: "rgba(250,246,240,0.9)", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>
                Tiên phong định hình tương lai của nghệ thuật tặng hoa cá nhân hóa.
              </p>
              <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "4.5rem", color: "#FAF6F0", margin: 0, fontWeight: 400, flexShrink: 0, lineHeight: 0.8 }}>
                Tầm nhìn
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quote interlude */}
      <div
        style={{
          background: "#FAF6F0",
          padding: "6rem 2rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: "40px",
            background: "rgba(196,163,90,0.4)",
          }}
        />
        <blockquote
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#737a58",
            maxWidth: "760px",
            margin: "0 auto",
            lineHeight: 1.4,
            letterSpacing: "0.02em",
          }}
        >
          "Một đóa hoa tựa như ánh nhìn hướng về bầu trời — một lời tự tình không hình bóng từ ngữ,
          một chốn lặng thinh lên tiếng cho tâm hồn."
        </blockquote>
        <cite
          style={{
            display: "block",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C4A35A",
            marginTop: "2rem",
            fontStyle: "normal",
          }}
        >
          — Trịnh Thị Trâm Anh, Nhà Sáng Lập, Art de Fleur
        </cite>
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "rgba(196,163,90,0.4)",
            margin: "2rem auto 0",
          }}
        />
      </div>

      {/* Lifestyle editorial — 3-column visual story */}
      <div
        ref={ref2}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2px",
          background: "#E8DDD0",
        }}
        className="three-col"
      >
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
          <img
            src={LIFESTYLE_IMAGE}
            alt="Lifestyle"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: in2 ? "scale(1)" : "scale(1.12)",
              transition: "transform 1.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s",
            }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(115, 122, 88,0.85), transparent)", padding: "2.5rem 1.5rem 1.5rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#FAF6F0", lineHeight: 1.3 }}>
              "Dành riêng cho những khoảnh khắc vô giá."
            </p>
          </div>
        </div>
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4" }}>
          <img
            src={STUDIO_IMAGE}
            alt="Studio"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: in2 ? "scale(1)" : "scale(1.12)",
              transition: "transform 1.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.25s",
            }}
          />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(115, 122, 88,0.85), transparent)", padding: "2.5rem 1.5rem 1.5rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#FAF6F0", lineHeight: 1.3 }}>
              "Chế tác từ đôi tay, cảm nhận bằng trái tim."
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "4rem 3rem",
            background: "#737a58",
            aspectRatio: "3/4",
          }}
          className="story-side-text"
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C4A35A",
              marginBottom: "1.5rem",
              opacity: in2 ? 1 : 0,
              transition: "opacity 0.8s ease 0.4s",
            }}
          >
            Nghệ Thuật Chế Tác
          </p>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: "#FAF6F0",
              lineHeight: 1.25,
              marginBottom: "1.5rem",
              opacity: in2 ? 1 : 0,
              transform: in2 ? "none" : "translateY(20px)",
              transition: "all 0.9s ease 0.5s",
            }}
          >
            Từ Chợ Hoa Đến <em>Trái Tim</em> Trong 4 Giờ
          </h3>
          {[
            "6h: Những chuyên gia của chúng tôi tuyển chọn hoa đẹp nhất tại chợ Rungis",
            "8h: Nghệ nhân hoa bắt đầu tạo hình cho kiệt tác của bạn",
            "10h: Kiểm định chất lượng & đóng gói theo dấu ấn đặc trưng",
            "12h trở đi: Giao hàng trong ngày trên toàn Paris",
          ].map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                opacity: in2 ? 1 : 0,
                transform: in2 ? "none" : "translateX(-10px)",
                transition: `all 0.7s ease ${0.6 + i * 0.12}s`,
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "1px solid rgba(196,163,90,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "#C4A35A" }}>
                  {i + 1}
                </span>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(250,246,240,0.65)", lineHeight: 1.6, fontWeight: 300 }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wrapping/packaging editorial */}
      <div
        ref={ref3}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "500px",
        }}
        className="story-split"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5rem",
            background: "#FAF6F0",
          }}
          className="story-text-pad"
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#C4A35A",
              marginBottom: "1.5rem",
              opacity: in3 ? 1 : 0,
              transition: "opacity 0.8s ease 0.1s",
            }}
          >
            Trải Nghiệm Mở Quà
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 400,
              color: "#737a58",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
              opacity: in3 ? 1 : 0,
              transform: in3 ? "none" : "translateY(20px)",
              transition: "all 0.9s ease 0.25s",
            }}
          >
            Nghệ Thuật Đóng Gói Tựa Như{" "}
            <em style={{ color: "#C4A35A" }}>Một Món Quà Biếu Tặng</em>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 300,
              color: "#8A7A72",
              lineHeight: 2,
              letterSpacing: "0.03em",
              opacity: in3 ? 1 : 0,
              transform: in3 ? "none" : "translateY(20px)",
              transition: "all 0.9s ease 0.4s",
            }}
          >
            Mỗi bó hoa Art de Fleur đều được bọc cẩn thận trong giấy gói độc quyền
            — do chính tay bạn chọn và thắt nơ nghệ thuật. Phút giây mở hộp được thiết kế 
            để khơi dậy niềm hân hoan: qua từng lớp giấy mềm lụa, những con dấu sáp vàng tinh xảo, 
            cùng tấm thiệp tay chứa đựng tâm tư từ xưởng hoa Paris của chúng tôi.
          </p>
        </div>

        <div style={{ overflow: "hidden", position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1667864811044-b0bcd9ed4a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080&q=80"
            alt="Signature packaging"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: in3 ? "scale(1)" : "scale(1.08)",
              transition: "transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-split { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr !important; }
          .story-text-pad { padding: 3rem 1.5rem !important; }
          .story-side-text { aspect-ratio: auto !important; }
        }
      `}</style>
    </section>
  );
}
