import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const PRODUCTS = [
  {
    id: "pepper",
    title: "Pepper",
    subtitle: "(Whole)",
    desc: "Pure Idukki whole pepper, sun-dried for a robust and earthy flavour.",
    img: "https://uploads.onecompiler.io/444asmhmf/444asjcr8/pepper1.jpg",
  },
  {
    id: "cardamom",
    title: "Cardamom",
    subtitle: "(Green)",
    desc: "Premium Kerala green cardamom — aromatic, hand-picked and carefully dried.",
    img: "https://uploads.onecompiler.io/444asmhmf/444asjcr8/cardamom1.jpg",
  },
  {
    id: "clove",
    title: "Clove",
    subtitle: "(Whole)",
    desc: "Handpicked cloves, oil-rich and perfect for both retail & bulk supply.",
    img: "https://uploads.onecompiler.io/444asmhmf/444asjcr8/clove.jpg",
  },
  {
    id: "honey",
    title: "Honey",
    subtitle: "(Natural)",
    desc: "Raw, unfiltered honey sourced from local apiaries — full of natural goodness.",
    img: "https://uploads.onecompiler.io/444asmhmf/444asjcr8/honey.jpg",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const intervalRef = useRef(null);
  const delay = 4500;

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [index]);

  function startAuto() {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % PRODUCTS.length);
    }, delay);
  }

  function stopAuto() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function goTo(i) {
    setIndex(i);
    startAuto();
  }

  const product = PRODUCTS[index];

  // --- Add these lines at the top of App() ---
const cardsRef = useRef(null);
const leftArrowRef = useRef(null);
const rightArrowRef = useRef(null);
const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(false);

function updateArrowState() {
  const el = cardsRef.current;
  if (!el) return;
  setCanScrollLeft(el.scrollLeft > 8);
  setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8);
}

// Set up scroll + resize listeners to keep arrows updated
useEffect(() => {
  const el = cardsRef.current;
  if (!el) return;
  updateArrowState();

  function handleScroll() { updateArrowState(); }
  function handleResize() { updateArrowState(); }

  el.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);

  return () => {
    el.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  };
}, []);


  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <img
            src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/logo3.jpg"
            alt="Cardamist"
            className="logo"
          />
        </div>

        <div className="header-right">
          {/* Desktop icons */}
          <div className="icons desktop-only">
            <a
              href="https://www.instagram.com/cardamist/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
                alt="Instagram"
                className="social-icon"
              />
            </a>
            <a
              href="https://wa.me/353894845174"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn-icons-png.freepik.com/512/152/152740.png"
                alt="WhatsApp"
                className="social-icon"
              />
            </a>
            <a href="tel:+919207076764">
              <img
                src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
                alt="Phone"
                className="social-icon"
              />
            </a>
          </div>

          {/* mobile menu toggle */}
          <button
            className="menu-btn mobile-only"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            ☰
          </button>
        </div>

        {/* Mobile dropdown icons only */}
        {menuOpen && (
          <div className="mobile-menu" role="dialog">
            <a
              href="https://www.instagram.com/cardamist/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
                alt="Instagram"
                className="mobile-social-icon"
              />
            </a>
            <a
              href="https://wa.me/353894845174"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://cdn-icons-png.freepik.com/512/152/152740.png"
                alt="WhatsApp"
                className="mobile-social-icon"
              />
            </a>
            <a href="tel:+919207076764">
              <img
                src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
                alt="Phone"
                className="mobile-social-icon"
              />
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main
        className="hero product-section"
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        <div className="half image-side">
          <img src={product.img} alt={product.title} className="product-img" />
        </div>

        <div className="half text-side">
          <p className="count">
            {String(index + 1).padStart(2, "0")} / {PRODUCTS.length}
          </p>
          <h1 className="title">{product.title}</h1>
          <h2 className="subtitle">{product.subtitle}</h2>
          <p className="desc">{product.desc}</p>

          <div className="nav-dots">
            {PRODUCTS.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </main>

{/* ---------- Products section (horizontal scroll) with arrows ---------- */}
<section className="products-section" aria-label="Our Products">
  <h2 className="section-title">Buy Now</h2>

  <div className="cards-wrap">
    {/* Left arrow */}
    <button
      className="cards-arrow left"
      onClick={() => {
        const el = cardsRef.current;
        if (!el) return;
        const card = el.querySelector('.product-card');
        const step = card ? card.offsetWidth + 24 : Math.round(el.offsetWidth * 0.32);
        el.scrollBy({ left: -step, behavior: 'smooth' });
      }}
      aria-label="Scroll left"
      ref={leftArrowRef}
      disabled={!canScrollLeft}
    >
      ‹
    </button>

    {/* Scroll container */}
    <div
      className="cards-scroll"
      ref={cardsRef}
      role="list"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          const el = cardsRef.current;
          const card = el?.querySelector('.product-card');
          const step = card ? card.offsetWidth + 24 : Math.round(el.offsetWidth * 0.32);
          el.scrollBy({ left: -step, behavior: 'smooth' });
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          const el = cardsRef.current;
          const card = el?.querySelector('.product-card');
          const step = card ? card.offsetWidth + 24 : Math.round(el.offsetWidth * 0.32);
          el.scrollBy({ left: step, behavior: 'smooth' });
        }
      }}
      onScroll={() => updateArrowState()}
    >
      {/* Cardamom */}
      <article className="product-card wide compact" role="listitem">
        <img
          src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/cardamom1.jpg"
          alt="Cardamom"
          className="product-full-img"
          loading="lazy"
        />
        <a
          className="btn buy-now-transparent"
          href="https://amzn.in/d/2boaY6F"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buy Cardamom on Amazon"
        >
          Buy Now
        </a>
      </article>

      {/* Pepper */}
      <article className="product-card wide compact" role="listitem">
        <img
          src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/pepper1.jpg"
          alt="Pepper"
          className="product-full-img"
          loading="lazy"
        />
        <a
          className="btn buy-now-transparent"
          href="https://amzn.in/d/bxeZgIg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buy Pepper on Amazon"
        >
          Buy Now
        </a>
      </article>

      {/* Honey */}
      <article className="product-card wide compact" role="listitem">
        <img
          src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/honey.jpg"
          alt="Honey"
          className="product-full-img"
          loading="lazy"
        />
        <span className="coming-soon" aria-hidden="true">Coming Soon</span>
      </article>

      {/* Clove */}
      <article className="product-card wide compact" role="listitem">
        <img
          src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/clove.jpg"
          alt="Clove"
          className="product-full-img"
          loading="lazy"
        />
        <span className="coming-soon" aria-hidden="true">Coming Soon</span>
      </article>
    </div>

    {/* Right arrow */}
    <button
      className="cards-arrow right"
      onClick={() => {
        const el = cardsRef.current;
        if (!el) return;
        const card = el.querySelector('.product-card');
        const step = card ? card.offsetWidth + 24 : Math.round(el.offsetWidth * 0.32);
        el.scrollBy({ left: step, behavior: 'smooth' });
      }}
      aria-label="Scroll right"
      ref={rightArrowRef}
      disabled={!canScrollRight}
    >
      ›
    </button>
  </div>
</section>

{/* ---------- Why Choose Us ---------- */}
<section className="why-section" aria-labelledby="why-title">
  <div className="why-inner">
    <h2 id="why-title" className="why-main-title">Why Choose Us?</h2>
    <p className="why-subtitle">Quality, purity and flavour — from Kerala's spice gardens to your kitchen.</p>

    <div className="why-grid">
      <article className="why-card" role="article" aria-label="Quality">
        <div className="why-image">
          <img src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/p1.jpg" alt="Quality" loading="lazy"/>
          <div className="why-overlay" />
          <div className="why-text">
            <strong>Quality</strong>
            <p>Sourced directly from trusted farmers and estates; naturally processed to retain essential oils.</p>
          </div>
        </div>
      </article>

      <article className="why-card" role="article" aria-label="Purity">
        <div className="why-image">
          <img src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/p2.jpg" alt="Purity" loading="lazy"/>
          <div className="why-overlay" />
          <div className="why-text">
            <strong>Purity</strong>
            <p>100% pure spices — no fillers, no artificial colours, no nonsense. Just nature's true flavours.</p>
          </div>
        </div>
      </article>

      <article className="why-card" role="article" aria-label="Flavours">
        <div className="why-image">
          <img src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/p3.jpg" alt="Flavours" loading="lazy"/>
          <div className="why-overlay" />
          <div className="why-text">
            <strong>Flavours</strong>
            <p>Bold, fresh and earthy — Cardamist spices add depth and character to every dish.</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>

{/* ---------- About Us ---------- */}
<section className="about-section" aria-labelledby="about-title">
  <div className="about-inner single">
    <h2 id="about-title" className="about-title">About Us</h2>
    <p className="about-sub">Pure. Authentic. Naturally Kerala.</p>

    <div className="about-text">
      <p>
        We bring the true essence of Kerala’s spice heritage to kitchens and businesses around the world.
        As a trusted name in both retail and wholesale spice trade, we specialize in delivering premium-quality,
        naturally sourced spices handpicked and unblended for unmatched purity and aroma.
      </p>

      <p>
        From the fertile hills and spice gardens of Kerala, our range — including Cardamom, Black Pepper,
        Cloves, and Honey — embodies the warmth, depth, and authenticity of nature itself. Each spice is
        carefully curated to preserve its essential oils, bold flavor, and natural character, free from artificial
        colors or additives.
      </p>

      <p>
        Whether you’re a home cook, gourmet brand, or bulk buyer, Cardamist stands for quality, purity, and
        the timeless flavor of India’s finest spices.
      </p>
    </div>

    <div className="about-actions">
      <a
        href="mailto:cardamist@gmail.com"
        className="contact-btn"
        aria-label="Send us an email"
      >
        Contact Us
      </a>
    </div>
  </div>
</section>



{/* ---------- Footer ---------- */}
<footer className="site-footer">
  <div className="footer-inner">
    <p className="footer-address">
      📍 Chakkupallam P.O, Kumily, Idukki Dist., Kerala, India
    </p>
    <p className="footer-contact">
      📞 <a href="tel:+919207076764">+91 92070 76764</a> &nbsp; | &nbsp;
      💬 <a href="https://wa.me/353894845174" target="_blank" rel="noreferrer">+353 8948 45174</a>
    </p>

    <div className="footer-socials">
      <a
        href="https://www.instagram.com/cardamist/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/87/87390.png"
          alt="Instagram"
          className="footer-icon"
        />
      </a>
      <a
        href="https://wa.me/353894845174"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        <img
          src="https://cdn-icons-png.freepik.com/512/152/152740.png"
          alt="WhatsApp"
          className="footer-icon"
        />
      </a>
    </div>

    <p className="footer-copy">
      © {new Date().getFullYear()} Cardamist. All Rights Reserved.
    </p>
  </div>
</footer>


</div>
  );
}
