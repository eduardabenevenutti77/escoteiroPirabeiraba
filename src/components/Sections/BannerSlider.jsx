import { useEffect, useRef, useState } from "react";
import styles from "./styles/BannerSlider.module.css";
import banner1 from "../../assets/new-images/banner1.webp";
import banner2 from "../../assets/new-images/banner3.webp";
import banner3 from "../../assets/new-images/banner4.webp";
// import contact from "./Contact";

import Button from "../General/Button";
const slides = [
  {
    id: 1,
    title: "Construindo um mundo melhor através do escotismo",
    buttonValue: "Venha fazer parte",
    image: banner1,
    link: "#contato"
  },
  {
    id: 2,
    title: "Atividades Dinâmicas",
    buttonValue: "Veja nossos eventos",
    image: banner2,
    link: "#contato"
  },
  {
    id: 3,
    title: "Educação para todas as idades",
    buttonValue: "Saiba mais",
    image: banner3,
    link: "#contato"
  },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState([0]);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const slidesLength = slides.length;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slidesLength);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slidesLength - 1 : prev - 1));

  const handleStart = (x) => {
    startX.current = x;
    isDragging.current = true;
  };

  const handleMove = (x) => {
    if (!isDragging.current) return;
    currentTranslate.current = x - startX.current;
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (currentTranslate.current < -50) nextSlide();
    else if (currentTranslate.current > 50) prevSlide();

    currentTranslate.current = 0;
  };

  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = handleEnd;

  const handleMouseDown = (e) => handleStart(e.clientX);
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleMouseUp = handleEnd;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleSlides((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.5 }
    );

    const slideElements = document.querySelectorAll(`.${styles.item}`);
    slideElements.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className={styles.mainBanner}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="region"
        aria-live="polite"
      >
        {/* Slides */}
        <div
          className={styles.slidesContainer}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              data-index={index}
              className={styles.item}
              style={{
                backgroundImage: visibleSlides.includes(index)
                  ? `url(${slide.image})`
                  : "none",
              }}
              role="img"
              aria-label={`Banner: ${slide.city}, ${slide.state} - ${slide.title}`}
            >
              <div className={styles.headerText}>
                <h2 data-aos="fade-up">
                  {slide.title.slice(0, 39)}
                  <strong>{slide.title.slice(39, 48)}</strong>
                </h2>
                <Button link={slide.link}>{slide.buttonValue}</Button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.owlDots}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`${styles.owlDot} ${index === currentIndex ? styles.active : ""
                }`}
              onClick={() => setCurrentIndex(index)}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerSlider;
