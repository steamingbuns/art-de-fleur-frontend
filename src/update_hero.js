const fs = require('fs');

let c = fs.readFileSync('d:/Projects/Art-de-Fleur/frontend/src/components/Hero.tsx', 'utf8');

c = c.replace(/const HERO_IMAGE[\s\S]*?;/, `const HERO_IMAGE = 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?auto=format&fit=crop&q=80&w=1920';`);

let banner = `
      {/* Top Banner */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          left: 0,
          right: 0,
          background: "transparent",
          borderTop: "1px solid rgba(250,246,240,0.8)",
          borderBottom: "1px solid rgba(250,246,240,0.8)",
          padding: "0.8rem 1rem",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: "#FAF6F0",
          fontSize: "1.2rem",
          letterSpacing: "0.02em",
          margin: 0
        }}>
          Nâng Tầm Kiệt Tác: Tặng đặc quyền sử dụng ruy băng lụa cao cấp cho thiết kế của bạn tuần này
        </p>
      </div>
`;
c = c.replace('{/* Gradient overlay */}', banner + '\n      {/* Gradient overlay */}');

c = c.replace(/<p[\s\S]*?Xưởng Hoa · Paris[\s\S]*?<\/p>/, '');

c = c.replace(/<h1[\s\S]*?<\/h1>/, `
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(4rem, 10vw, 8rem)",
            fontWeight: 400,
            color: "#FAF6F0",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
            maxWidth: "1000px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          Tác phẩm hoa của riêng bạn
        </h1>
`);

c = c.replace(/<p[\s\S]*?Tạo nên kiệt tác hoa độc bản[\s\S]*?<\/p>/, `
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            fontWeight: 400,
            color: "#FAF6F0",
            maxWidth: "600px",
            lineHeight: 1.6,
            marginBottom: "3.5rem",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}
        >
          Chọn hoa, phối màu, thêm phụ kiện. Tự tay làm nên tác phẩm độc nhất chỉ với vài thao tác
        </p>
`);

c = c.replace('Sáng Tạo Bó Hoa Của Tôi', 'THIẾT KẾ NGAY');
c = c.replace('Khám Phá', 'KHÁM PHÁ');
c = c.replace(/paddingTop: "80px"/, 'paddingTop: "160px"');

c = c.replace(/<div\s*style=\{\{\s*width: "80px",\s*height: "1px",\s*background: "rgba\(196,163,90,0\.6\)",\s*margin: "2rem auto",\s*\}\}\s*\/>/, '');

fs.writeFileSync('d:/Projects/Art-de-Fleur/frontend/src/components/Hero.tsx', c);
