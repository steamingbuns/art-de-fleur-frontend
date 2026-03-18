import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1661081531797-36cd03a23e07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByb3NlJTIwYm91cXVldCUyMGVsZWdhbnQlMjBGcmVuY2h8ZW58MXx8fHwxNzczODA2NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080";

interface HeroProps {
  onBuildClick: () => void;
}

export function Hero({ onBuildClick }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  const [parallax, setParallax] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = HERO_IMAGE;
    img.onload = () => setLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        setParallax(scrollY * 0.4);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        background: "#1C0D10",
      }}
    >
      {/* Parallax background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${parallax}px) scale(1.1)`,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease",
          filter: "brightness(0.55)",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(28,13,16,0.3) 0%, rgba(28,13,16,0.1) 40%, rgba(28,13,16,0.7) 100%)",
        }}
      />

      {/* Decorative gold corner lines */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "2.5rem",
          width: "60px",
          height: "1px",
          background: "rgba(196,163,90,0.7)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "2.5rem",
          width: "1px",
          height: "60px",
          background: "rgba(196,163,90,0.7)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          right: "2.5rem",
          width: "60px",
          height: "1px",
          background: "rgba(196,163,90,0.7)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          right: "2.5rem",
          width: "1px",
          height: "60px",
          background: "rgba(196,163,90,0.7)",
        }}
      />

      {/* Top Banner */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "0.8rem",
          background: "rgba(30, 30, 30, 0.9)",
          borderBottom: "1px solid #FAF6F0",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#FAF6F0",
            fontSize: "1rem",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          Nâng Tầm Kiệt Tác: Tặng đặc quyền sử dụng ruy băng lụa cao cấp cho thiết kế của bạn tuần này
        </p>
      </div>

      {/* Hero content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          paddingTop: "100px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.4s ease 0.3s, transform 1.4s ease 0.3s",
        }}
      >
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            fontWeight: 400,
            color: "#FAF6F0",
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            marginBottom: "1rem",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          Tác phẩm hoa của riêng bạn
        </h1>

        <div
          style={{
            width: "300px",
            height: "1px",
            background: "rgba(250,246,240,0.6)",
            margin: "1rem auto 2rem auto",
          }}
        />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            fontWeight: 400,
            letterSpacing: "0.05em",
            color: "#FAF6F0",
            maxWidth: "600px",
            lineHeight: 1.6,
            marginBottom: "3rem",
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          Chọn hoa, phối màu, thêm phụ kiện. Tự tay làm nên tác phẩm độc nhất chỉ với vài thao tác
        </p>

        <div
          style={{
            display: "flex",
            gap: "1.2rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={onBuildClick}
            style={{
              background: "#C4A35A",
              border: "1px solid #C4A35A",
              borderRadius: "4px",
              color: "#FAF6F0",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.8rem 2.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B8934F";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C4A35A";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            THIẾT KẾ NGAY
          </button>
          <button
            onClick={() =>
              document
                .getElementById("showcase")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid #FAF6F0",
              borderRadius: "4px",
              color: "#FAF6F0",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.8rem 2.5rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(250,246,240,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.3)";
            }}
          >
            KHÁM PHÁ
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          color: "rgba(250,246,240,0.6)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          animation: "bounce 2s infinite",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Tìm Hiểu Thêm
        </span>
        <ChevronDown size={16} />
      </button>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
