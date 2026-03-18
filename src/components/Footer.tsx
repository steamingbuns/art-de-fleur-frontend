import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: "#5D6346", color: "#FAF6F0", overflow: "hidden", padding: "5rem 2rem" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "4rem",
          flexWrap: "wrap",
        }}
      >
        {/* Left Column */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
           <div style={{ width: "160px", height: "160px", backgroundColor: "#FAF6F0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", overflow: "hidden", padding: "10px" }}>
               <img src="https://images.unsplash.com/photo-1578241561880-0a1d5ce3cb10?auto=format&fit=crop&q=80&w=200" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
           </div>
           
           <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 400, margin: "0 0 0.5rem 0", letterSpacing: "0.02em" }}>
             Art de Fleur
           </h2>
           <a href="mailto:contact@artdefleur.com" style={{ color: "#FAF6F0", textDecoration: "underline", textUnderlineOffset: "6px", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", marginBottom: "3rem" }}>
             contact@artdefleur.com
           </a>

           <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "fit-content" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
               <div style={{ display: 'flex', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid #FAF6F0', alignItems: 'center' }}>
                 <Phone size={14} color="#FAF6F0" style={{ strokeWidth: 2 }} />
               </div>
               <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>0996748975</span>
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
               <div style={{ display: 'flex', justifyContent: 'center', width: '32px' }}>
                 <MapPin size={26} color="#FAF6F0" style={{ strokeWidth: 1.5 }} />
               </div>
               <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>Quận 1, TPHCM</span>
             </div>
             <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
               <div style={{ display: 'flex', justifyContent: 'center', width: '32px' }}>
                 <Clock size={26} color="#FAF6F0" style={{ strokeWidth: 1.5 }} />
               </div>
               <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>8:00-20:00</span>
             </div>
             <a href="#contact" style={{ color: "#FAF6F0", textDecoration: "underline", textUnderlineOffset: "6px", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginTop: "0.5rem", marginLeft: "3rem" }}>
               Liên hệ
             </a>
           </div>
        </div>

        {/* Vertical Divider */}
        <div className="footer-divider" style={{ width: "1px", background: "rgba(250,246,240,0.4)" }}></div>

        {/* Middle Column */}
        <div style={{ flex: "1 1 250px", display: "flex", flexDirection: "column", alignItems: "center" }}>
           <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400, margin: "0 0 1.8rem 0", letterSpacing: "0.05em" }}>
             FAQ
           </h3>
           <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.8rem", textAlign: "center" }}>
              {["Chính sách Giao nhận", "Chính sách Đổi trả & Hoàn tiền", "Chính sách Bảo mật thông tin", "Chính sách Thanh toán", "Điều khoản Dịch vụ"].map(item => (
                  <li key={item}>
                     <a href="#" style={{ color: "#FAF6F0", textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}>{item}</a>
                  </li>
              ))}
           </ul>
        </div>

        {/* Right Column */}
        <div style={{ flex: "1.2 1 450px", display: "flex", flexDirection: "column", alignItems: "center" }}>
           <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 400, margin: "0 0 1.5rem 0", letterSpacing: "0.02em" }}>
             Dịch vụ khách hàng
           </h3>
           <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1.4rem", textAlign: "center", marginBottom: "2.5rem" }}>
              {["Tư Vấn Thiết Kế", "Bí Quyết Chăm Sóc Hoa", "Đặc Quyền Thành Viên"].map(item => (
                  <li key={item}>
                     <a href="#" style={{ color: "#FAF6F0", textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400 }}>{item}</a>
                  </li>
              ))}
           </ul>

           <a href="#" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", color: "#FAF6F0", textDecoration: "underline", textUnderlineOffset: "6px", marginBottom: "1.5rem", fontWeight: 500 }}>
             Theo dõi chúng tôi tại:
           </a>
           <div style={{ display: "flex", gap: "1.2rem", marginBottom: "3rem" }}>
              {/* Social Icons */}
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Facebook size={24} fill="white" color="white" strokeWidth={0} />
              </div>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "black", border: "1.5px solid rgba(250,246,240,0.8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </div>
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Instagram size={24} color="white" />
              </div>
           </div>

           {/* Newsletter Box */}
           <div style={{ background: "white", padding: "2.5rem 2rem", width: "100%", maxWidth: "480px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 500, color: "black", margin: "0 0 2rem 0", textAlign: "left", lineHeight: 1.35 }}>
                 Đăng kí thành viên ngay để nhận những đặc quyền thành viên hấp dẫn
              </p>
              <input type="email" placeholder="Nhập email của bạn" style={{ width: "100%", padding: "0.8rem 0", border: "none", borderBottom: "1px solid #777", marginBottom: "2rem", outline: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }} />
              <button style={{ width: "100%", background: "black", color: "white", border: "none", padding: "1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", cursor: "pointer", borderRadius: "4px" }}>
                 Đăng kí
              </button>
           </div>
        </div>
      </div>
      <style>{`
          @media (max-width: 900px) {
            .footer-divider { display: none !important; }
          }
      `}</style>
    </footer>
  );
}