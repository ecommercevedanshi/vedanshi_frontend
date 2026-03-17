import img from "../../assets/brandSection/image-2.jpeg";

const BrandSection2 = () => {
  return (
    <section
      className="w-full"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      {/* ── DESKTOP lg+ ── */}
      <div className="hidden lg:flex min-h-[600px]">

        {/* LEFT — image (mirrored from BrandSection's right) */}
        <div
          className="w-1/2 relative overflow-hidden"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <div className="relative w-full h-full">
            <img
              src={img}
              alt="Vedastras Women"
              className="w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.45 }}
            />
          </div>
        </div>

        {/* RIGHT — text */}
        <div className="w-1/2 flex flex-col justify-between px-16 py-16">

          {/* Top paragraph */}
          <p
            className="text-textPrimary text-xl leading-relaxed text-center"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Every piece is thoughtfully crafted to reflect sophistication while
            honoring the roots of tradition. At Vedastras, we believe fashion is
            not only about what you wear, but about the story you carry—woven
            with culture, comfort, and contemporary style.
          </p>

          {/* Bottom label */}
          <p
            className="text-textMuted tracking-[4px] text-sm font-light text-right"
            style={{ fontFamily: "Georgia, serif" }}
          >
            N E W &nbsp; C O L L E C T I O N S
          </p>

        </div>
      </div>

      {/* ── TABLET + MOBILE < lg — identical structure to BrandSection ── */}
      <div className="lg:hidden relative min-h-[520px] sm:min-h-[640px] flex flex-col justify-between overflow-hidden">

        {/* BG IMAGE */}
        <div>
          <img
            src={img}
            alt="Vedastras Women"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "var(--color-primary)", opacity: 0.45 }}
          />
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-primary/60" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col justify-between h-full px-8 pt-12 pb-32 min-h-[520px] sm:min-h-[640px]">

          {/* Top label */}
          <p
            className="text-white/80 tracking-[5px] text-[8px] sm:text-sm font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            N E W &nbsp; C O L L E C T I O N S
          </p>

          {/* Brand name */}
          <p
            className="text-white text-5xl sm:text-7xl mt-6"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Vedastras
          </p>

          {/* Paragraph */}
          <p
            className="text-white/90 text-sm sm:text-base leading-relaxed text-center mt-auto"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Every piece is thoughtfully crafted to reflect sophistication while
            honoring the roots of tradition. At Vedastras, we believe fashion is
            not only about what you wear, but about the story you carry—woven
            with culture, comfort, and contemporary style.
          </p>

        </div>
      </div>

    </section>
  );
};

export default BrandSection2;