import React, { useState, useRef, useEffect } from "react";
import "./App.css";

/* =================================
   INSTAGRAM FEED - BEHOLD
================================= */

function InstagramFeed() {
  return (
    <div className="instagram-feed-wrap">
      <behold-widget
        feed-id="EypWU8ekq4j0J7v8s9Rl"
      ></behold-widget>
    </div>
  );
}


/* =================================
   MAIN APP
================================= */

export default function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  /* Load Behold widget script */
  useEffect(() => {
    if (window.__bhldScript) return;

    window.__bhldScript = true;

    const script = document.createElement("script");

    script.type = "module";
    script.src = "https://w.behold.so/widget.js";

    document.head.appendChild(script);
  }, []);


  /* For card slider */

  const cardsRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);


  /* =================================
     PRODUCTS
  ================================= */

  const cards = [
    {
      title: "Card 1",
      img: "https://uploads.onecompiler.io/444asmhmf/444r4d5qf/cardamom3.jpg",
      link: "https://amzn.in/d/5V6T13R"
    },
    {
      title: "Card 2",
      img: "https://uploads.onecompiler.io/444asmhmf/444qvdnmq/Untitled%20design%20(3).jpg",
      link: "https://amzn.in/d/aXHzUHD"
    },
    {
      title: "Card 3",
      img: "https://uploads.onecompiler.io/444asmhmf/444r4d5qf/PURE%20HONEY.jpg",
      link: null
    },
    {
      title: "Card 4",
      img: "https://uploads.onecompiler.io/444asmhmf/444r4d5qf/PURE%20HONEY%20(1).jpg",
      link: null
    }
  ];


  /* =================================
     ARROW STATE
  ================================= */

  const updateArrowState = () => {
    const el = cardsRef.current;

    if (!el) return;

    const {
      scrollLeft,
      scrollWidth,
      clientWidth
    } = el;

    setCanScrollLeft(scrollLeft > 0);

    setCanScrollRight(
      scrollLeft + clientWidth < scrollWidth - 2
    );
  };


  useEffect(() => {
    updateArrowState();

    window.addEventListener(
      "resize",
      updateArrowState
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateArrowState
      );
  }, []);


  /* =================================
     SCROLL STEP
  ================================= */

  const scrollStep = () => {
    const el = cardsRef.current;

    if (!el) return 250;

    const card =
      el.querySelector(".product-card");

    return card
      ? card.offsetWidth + 24
      : 250;
  };


  /* =================================
     RENDER
  ================================= */

  return (
    <div className="page">


      {/* =================================
          HEADER
      ================================= */}

      <header className="header">

        {/* LOGO */}

        <div className="header-left">

          <img
            src="https://uploads.onecompiler.io/444asmhmf/444hpejdd/1000028492.png"
            className="header-logo"
            alt="Cardamist"
          />

        </div>


        {/* DESKTOP RIGHT ICONS */}

        <div className="header-right">

          <a
            href="https://www.instagram.com/cardamist/"
            target="_blank"
            rel="noreferrer"
            className="icon-row"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
              alt="Instagram"
            />

            <span>
              Instagram
            </span>

          </a>


          <a
            href="https://wa.me/353894845174"
            target="_blank"
            rel="noreferrer"
            className="icon-row"
          >

            <img
              src="https://cdn-icons-png.freepik.com/512/152/152740.png"
              alt="WhatsApp"
            />

            <span>
              WhatsApp
            </span>

          </a>


          <a
            href="tel:+919207076764"
            className="icon-row"
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
              alt="Call"
            />

            <span>
              Call
            </span>

          </a>

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >

          <span className="hamburger-line line1"></span>
          <span className="hamburger-line line2"></span>
          <span className="hamburger-line line3"></span>

        </button>


        {/* MOBILE MENU */}

        <div
          className="mobile-menu"
          id="mobile-menu"
          style={{
            display: menuOpen
              ? "flex"
              : "none"
          }}
          role="dialog"
        >

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

      </header>



      {/* =================================
          HERO SECTION
      ================================= */}

      <section className="hero-section">

        <div className="overlay">

          <div className="hero-content">

            <h1>
              Pure Idukki Spices
            </h1>

            <h1>
              From Our Soil
            </h1>

            <h1>
              to Your Spice Rack.
            </h1>

            <p>
              Estate-grown, hand-harvested
              spices-pure, fresh, and free
              from additives
            </p>

            <a
              href="#products"
              className="cta-btn"
            >
              SHOP NOW
            </a>

          </div>

        </div>

      </section>



      {/* =================================
          ABOUT US + INSTAGRAM
      ================================= */}

      <section
        className="about-section"
        aria-labelledby="about-title"
      >

        <div className="about-inner about-wrapper single">


          {/* LEFT: ABOUT US */}

          <div className="about-content">

            <h2
              id="about-title"
              className="about-title"
            >
              About Us
            </h2>

            <p className="about-sub">
              Pure. Honest. Rooted in Idukki.
            </p>


            <div className="about-text">

              <p>
                At Cardamist, we bring the true
                essence of Kerala’s spice heritage
                straight from our estate in Idukki
                to kitchens across India. What we
                grow is what you get — pure spices
                nurtured in rich forest soil,
                handpicked with care, and packed
                without additives, preservatives,
                or shortcuts.
              </p>


              <p>
                For generations, our family has
                cultivated black pepper, cardamom,
                cloves, and honey in the mist-covered
                hills of Idukki. Every batch we harvest
                carries the aroma of shade-grown
                farming, the depth of essential oils,
                and the authenticity that only nature
                can create. No blending. No artificial
                color. No industrial processing.
              </p>


              <p>
                Whether you're a home cook, a café,
                or a bulk buyer, Cardamist stands
                for integrity, purity, and the timeless
                flavours that Kerala is known for.
              </p>

            </div>


            <div className="about-actions">

              <a
                href="tel:+919207076764"
                className="contact-btn"
                aria-label="Contact Us"
              >
                Contact Us
              </a>

            </div>

          </div>



          {/* RIGHT: INSTAGRAM */}

          <aside
            className="instagram-content"
            aria-labelledby="instagram-title"
          >

            <h2
              id="instagram-title"
              className="instagram-title"
            >
              Follow Our Journey
            </h2>


            <p className="instagram-sub">

               Follow{" "}

              <a
                href="https://www.instagram.com/cardamist/"
                target="_blank"
                rel="noreferrer"
              >
                @cardamist
              </a>

            </p>


            <InstagramFeed />

          </aside>

        </div>

      </section>



      {/* =================================
          PRODUCT SECTION
      ================================= */}

      <section
        id="products"
        className="products-section full-page"
        aria-label="Our Products"
      >

        <h2 className="section-title">
          Shop Fresh Spices
        </h2>


        <div className="cards-wrap">


          {/* LEFT ARROW */}

          <button
            className="cards-arrow left"
            ref={leftArrowRef}
            disabled={!canScrollLeft}
            onClick={() => {

              const el =
                cardsRef.current;

              if (!el) return;

              el.scrollBy({
                left: -scrollStep(),
                behavior: "smooth"
              });

            }}
          >
            ‹
          </button>



          {/* SCROLL AREA */}

          <div
            className="cards-scroll"
            ref={cardsRef}
            role="list"
            tabIndex={0}
            onScroll={updateArrowState}
            onKeyDown={(e) => {

              if (
                e.key === "ArrowLeft"
              ) {

                e.preventDefault();

                cardsRef.current?.scrollBy({
                  left: -scrollStep(),
                  behavior: "smooth"
                });

              }

              else if (
                e.key === "ArrowRight"
              ) {

                e.preventDefault();

                cardsRef.current?.scrollBy({
                  left: scrollStep(),
                  behavior: "smooth"
                });

              }

            }}
          >


            {/* PRODUCT CARDS */}

            {cards.map((card, index) => (

              <article
                key={index}
                className="product-card wide compact"
              >

                <img
                  src={card.img}
                  alt={card.title}
                  className="product-full-img"
                />


                {card.link ? (

                  <a
                    className="btn buy-now-transparent"
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy Now
                  </a>

                ) : (

                  <div className="coming-soon">
                    Coming Soon
                  </div>

                )}

              </article>

            ))}

          </div>



          {/* RIGHT ARROW */}

          <button
            className="cards-arrow right"
            ref={rightArrowRef}
            disabled={!canScrollRight}
            onClick={() => {

              const el =
                cardsRef.current;

              if (!el) return;

              el.scrollBy({
                left: scrollStep(),
                behavior: "smooth"
              });

            }}
          >
            ›
          </button>

        </div>

      </section>



      {/* =================================
          WHY CHOOSE US
      ================================= */}

      <section
        className="why-section full-page"
        aria-labelledby="why-title"
      >

        <div className="why-inner">

          <h2
            id="why-title"
            className="why-main-title"
          >
            Why Choose Us?
          </h2>


          <p className="why-subtitle">
            Quality, purity and flavour —
            from Kerala's spice gardens
            to your kitchen.
          </p>


          <div className="why-grid">


            {/* QUALITY */}

            <article
              className="why-card"
              role="article"
              aria-label="Quality"
            >

              <div className="why-image">

                <img
                  src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/p1.jpg"
                  alt="Quality"
                  loading="lazy"
                />

                <div className="why-overlay" />

                <div className="why-text">

                  <strong>
                    Quality
                  </strong>

                  <p>
                    Sourced directly from trusted
                    farmers and estates; naturally
                    processed to retain essential oils.
                  </p>

                </div>

              </div>

            </article>



            {/* PURITY */}

            <article
              className="why-card"
              role="article"
              aria-label="Purity"
            >

              <div className="why-image">

                <img
                  src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/p2.jpg"
                  alt="Purity"
                  loading="lazy"
                />

                <div className="why-overlay" />

                <div className="why-text">

                  <strong>
                    Purity
                  </strong>

                  <p>
                    100% pure spices — no fillers,
                    no artificial colours, no nonsense.
                    Just nature's true flavours.
                  </p>

                </div>

              </div>

            </article>



            {/* FLAVOURS */}

            <article
              className="why-card"
              role="article"
              aria-label="Flavours"
            >

              <div className="why-image">

                <img
                  src="https://uploads.onecompiler.io/444asmhmf/444asjcr8/p3.jpg"
                  alt="Flavours"
                  loading="lazy"
                />

                <div className="why-overlay" />

                <div className="why-text">

                  <strong>
                    Flavours
                  </strong>

                  <p>
                    Bold, fresh and earthy —
                    Cardamist spices add depth
                    and character to every dish.
                  </p>

                </div>

              </div>

            </article>


          </div>

        </div>

      </section>



      {/* =================================
          FOOTER
      ================================= */}

      <footer className="site-footer">

        <div className="footer-inner">

          <p className="footer-address">
            📍 Chakkupallam P.O,
            Kumily, Idukki Dist., Kerala, India
          </p>


          <p className="footer-contact">

            📞{" "}

            <a href="tel:+919207076764">
              +91 92070 76764
            </a>

            &nbsp; | &nbsp;

            💬{" "}

            <a
              href="https://wa.me/353894845174"
              target="_blank"
              rel="noreferrer"
            >
              +353 8948 45174
            </a>

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


            <a
              href="tel:+919207076764"
              aria-label="Call"
            >

              <img
                src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
                alt="Call"
                className="footer-icon"
              />

            </a>

          </div>


          <p className="footer-copy">
            © {new Date().getFullYear()}
            {" "}Cardamist. All Rights Reserved.
          </p>

        </div>

      </footer>


    </div>
  );
}