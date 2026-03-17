import image from "../../assets/brandSection/imag.jpeg";
const BrandSection = () => {
  return (
    <section
      className="w-full"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      {/* ── DESKTOP lg+ : side by side ── */}
      <div className="hidden lg:flex min-h-[600px]">
        {/* LEFT — text */}
        <div className="w-1/2 flex flex-col justify-between px-16 py-16">
          {/* Top label */}
          <p
            className="text-textMuted tracking-[4px] text-sm font-light"
            style={{ fontFamily: "Georgia, serif" }}
          >
            N E W &nbsp; C O L L E C T I O N S
          </p>

          {/* Bottom paragraph */}
          <p
            className="text-textPrimary text-xl leading-relaxed text-center"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Vedastras is more than just a clothing brand—it is a celebration of
            heritage, culture, and timeless fashion. Inspired by the wisdom and
            elegance of ancient traditions, Vedastras brings together classic
            artistry with modern design to create clothing that speaks of
            identity, confidence, and authenticity
          </p>
        </div>

        {/* RIGHT — image */}
        <div
          className="w-1/2 relative overflow-hidden"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {/* Brand name watermark */}
          <p
            className="absolute top-40 left-10 z-10 text-white text-6xl"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            Vedastras
          </p>

          {/* Image with primary color overlay on top */}
          <div className="relative w-full h-full">
            <img
              src={image}
              alt="Vedastras"
              className="w-full h-full object-cover object-top"
            />
            {/* PRIMARY SHADE OVERLAY */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "var(--color-primary)", opacity: 0.45 }}
            />
          </div>
        </div>
      </div>

      {/* ── TABLET + MOBILE < lg : image as bg, content on top ── */}
      <div className="lg:hidden relative min-h-[520px] sm:min-h-[640px] flex flex-col justify-between overflow-hidden">
        {/* BG IMAGE */}
        <div className="">
        <img
          src={image}
          alt="Vedastras"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* PRIMARY SHADE OVERLAY */}
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
            Vedastras is more than just a clothing brand—it is a celebration of
            heritage, culture, and timeless fashion. Inspired by the wisdom and
            elegance of ancient traditions, Vedastras brings together classic
            artistry with modern design to create clothing that speaks of
            identity, confidence, and authenticity
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
