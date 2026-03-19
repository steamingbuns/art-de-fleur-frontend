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
    <section id="story" style={{ background: "#FAF6F0", overflow: "hidden", scrollMarginTop: "80px" }}>  

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

      {/* Lifestyle editorial — mapped to "Khám phá" explore section */}
      <div
        ref={ref2}
        id="explore"
        style={{
          background: "#737a58", // Olive/Green background
          padding: "6rem 0",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem", opacity: in2 ? 1 : 0, transition: "opacity 0.8s ease" }}>
          <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(3.5rem, 6vw, 5rem)", color: "#FAF6F0", fontWeight: 400, margin: 0, lineHeight: 1 }}>
            Khám phá
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", width: "100%", margin: "0 auto", paddingBottom: "2rem" }}>
          {[
            {
              id: "pre-order",
              title: "Pre-order",
              subtitle: "Lưu Giữ Trọn Vẹn Đường Nét",
              desc: "Những mẫu thiết kế thịnh hành luôn cần thời gian để chuẩn bị những loại hoa đặc biệt nhất.",
              link: "Xem bộ sưu tập",
              img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
              align: "left" as const
            },
            {
              id: "customize",
              title: "Customize",
              subtitle: "Kiến Tạo Kiệt Tác Độc Bản",
              desc: "Không rập khuôn, không giới hạn. Tự do lựa chọn từng nhành hoa, sắc giấy gói và dải ruy băng để tự tay thiết kế nên một tác phẩm nghệ thuật mang đậm dấu ấn và câu chuyện của riêng bạn.",
              link: "Thiết kế ngay",
              img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
              align: "right" as const
            },
            {
              id: "gift-box",
              title: "Gift-box",
              subtitle: "Gói Trọn Sự Bất Ngờ",
              desc: "Hơn cả một thiết kế hoa, mỗi chiếc hộp là một \"khu vườn thu nhỏ\" được cất giấu tinh tế. Tặng phẩm hoàn hảo để khoảnh khắc mở quà của người thương trở thành một trải nghiệm vỡ òa và khó quên.",
              link: "Đặt ngay",
              img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
              align: "left" as const
            }
          ].map((item, i) => {
            const isLeft = item.align === "left";
            return (
              <div
                key={item.id}
                id={item.id}
                style={{
                  position: "relative",                  scrollMarginTop: "120px",                  display: "flex",
                  flexDirection: isLeft ? "row" : "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: in2 ? 1 : 0,
                  transform: in2 ? "none" : "translateY(20px)",
                  transition: `all 0.8s ease ${0.2 + i * 0.2}s`,
                }}
                className="explore-row flex-col md:flex-row gap-8 md:gap-0"
              >
                {/* Text Box Area */}
                <div 
                  className="w-full md:w-[65%] flex relative z-10"
                  style={{ 
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      background: "#FAF6F0",
                      borderRadius: isLeft ? "0 15rem 15rem 0" : "15rem 0 0 15rem", // Flat on the outside, rounded near the center picture
                      padding: isLeft
                        ? "4rem 30rem 4rem 6rem" // padding right to make room for center image
                        : "4rem 6rem 4rem 30rem", // padding left to make room for center image
                      width: "100%",
                      minHeight: "350px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      position: "relative",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                      transform: isLeft ? "translateX(-2rem)" : "translateX(2rem)", // Stretch it visually closer to the edge
                    }}
                    className="explore-text-box"
                  >
                    <h3 
                      style={{ 
                        fontFamily: "'Cormorant Garamond', serif", 
                        fontSize: "clamp(4.5rem, 6vw, 5.5rem)", 
                        color: "rgba(115, 122, 88, 0.15)", // Subtle watermark-like large title
                        margin: "0 0 0.5rem 0",
                        lineHeight: 0.9,
                        letterSpacing: "0.02em"
                      }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ position: "relative", zIndex: 2 }}>
                      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 700, color: "#737a58", margin: "0 0 1rem 0", letterSpacing: "0.02em" }}>
                        {item.subtitle}
                      </h4>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "#444", lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Link Area */}
                <div className="w-full md:w-[35%] flex items-center justify-center p-8 z-10">
                  <a 
                    href={`/${item.id}`} 
                    style={{ 
                      fontFamily: "'Cormorant Garamond', serif", 
                      fontSize: "2.5rem", 
                      color: "#FAF6F0", 
                      textDecoration: "underline", 
                      textUnderlineOffset: "6px",
                      fontStyle: "italic",
                      transition: "color 0.3s ease",
                      letterSpacing: "0.05em"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#C4A35A"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#FAF6F0"}
                  >
                    {item.link}
                  </a>
                </div>

                {/* Center Picture */}
                <div 
                  className="absolute z-20 pointer-events-none hidden md:block"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "clamp(220px, 22vw, 320px)",
                      height: "clamp(220px, 22vw, 320px)",
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                      border: "4px solid transparent"
                    }}
                  />
                  {/* Decorative floral accent */}
                  <div style={{ position: "absolute", inset: "-15px", border: "1.5px dashed rgba(196,163,90,0.5)", borderRadius: "50%", zIndex: -1 }} />
                </div>
                
                {/* Mobile Picture */}
                <div className="md:hidden flex justify-center w-full mb-4 z-20">
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: "220px",
                      height: "220px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                    }}
                  />
                </div>
              </div>
            );
          })}
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
