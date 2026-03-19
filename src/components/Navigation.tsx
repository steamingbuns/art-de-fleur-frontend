import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
  forceSolid?: boolean;
}

export function Navigation({ cartCount, onCartClick, forceSolid = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const isSolid = scrolled || forceSolid;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setMenuOpen(false);
      return;
    }

    if (["story", "pre-order", "customize", "gift-box"].includes(id)) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setMenuOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.5s ease",
          background: isSolid
            ? "rgba(250, 246, 240, 0.92)"
            : "transparent",
          backdropFilter: isSolid ? "blur(12px)" : "none",
          borderBottom: isSolid ? "1px solid rgba(196, 163, 90, 0.2)" : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "64px" : "80px",
            transition: "height 0.5s ease",
          }}
        >
          {/* Logo */}
          <div
            onClick={goHome}
            style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: isSolid ? "#737a58" : "#FAF6F0",
                lineHeight: 1,
              }}
            >
              ART DE FLEUR
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 300,
                letterSpacing: "0.35em",
                color: isSolid ? "#C4A35A" : "rgba(250,246,240,0.7)",
                marginTop: "2px",
              }}
            >
              PARIS · NGHỆ THUẬT HOA
            </span>
          </div>

          {/* Desktop nav links */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              alignItems: "center",
            }}
            className="hidden md:flex"
          >
            {[
              { label: "Về chúng tôi", id: "story" },
              { label: "Pre-order", id: "pre-order" },
              { label: "Customize", id: "customize" },
              { label: "Gift-box", id: "gift-box" },
              { label: "Liên hệ", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  color: isSolid ? "#737a58" : "rgba(250,246,240,0.9)",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                  padding: "0.25rem 0",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#C4A35A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isSolid
                    ? "#737a58"
                    : "rgba(250,246,240,0.9)")
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={onCartClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                color: isSolid ? "#737a58" : "#FAF6F0",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                transition: "color 0.3s ease",
              }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-8px",
                    background: "#C4A35A",
                    color: "#FAF6F0",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    fontSize: "0.6rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => scrollTo("customize")}
              className="hidden md:block"
              style={{
                background: isSolid ? "#737a58" : "rgba(250,246,240,0.15)",
                border: `1px solid ${isSolid ? "#737a58" : "rgba(250,246,240,0.6)"}`,
                color: isSolid ? "#FAF6F0" : "#FAF6F0",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "0.5rem 1.2rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                backdropFilter: isSolid ? "none" : "blur(4px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C4A35A";
                e.currentTarget.style.borderColor = "#C4A35A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isSolid
                  ? "#737a58"
                  : "rgba(250,246,240,0.15)";
                e.currentTarget.style.borderColor = isSolid
                  ? "#737a58"
                  : "rgba(250,246,240,0.6)";
              }}
            >
              Sáng Tạo Bó Hoa
            </button>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
              style={{
                background: "none",
                border: "none",
                color: isSolid ? "#737a58" : "#FAF6F0",
                cursor: "pointer",
                display: "flex",
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "#FAF6F0",
          zIndex: 99,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.77,0,0.175,1)",
        }}
      >
        {[
          { label: "Về chúng tôi", id: "story" },
          { label: "Pre-order", id: "pre-order" },
          { label: "Customize", id: "customize" },
          { label: "Gift-box", id: "gift-box" },
          { label: "Liên hệ", id: "contact" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#737a58",
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => scrollTo("customize")}
          style={{
            marginTop: "1rem",
            background: "#737a58",
            border: "none",
            color: "#FAF6F0",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.75rem 2rem",
            cursor: "pointer",
          }}
        >
          Sáng Tạo Bó Hoa
        </button>
      </div>
    </>
  );
}
