import React, { useState, useCallback, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import * as styles from '../styles/carousel.module.css';

export default function Carousel({ slides }) {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }, emblaRoot => emblaRoot.parentElement));

  const [viewportRef, embla] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = useCallback(index => embla && embla.scrollTo(index), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <div>
      <div className={styles.viewport} ref={viewportRef}>
        <div>
          {slides.map((slide, index) => (
            <div key={index} className={styles.slide}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {scrollSnaps.map((_, index) => (
          <button key={index} className={styles.dot} style={{ backgroundColor: selectedIndex === index ? '#3aafa9' : '#feffff' }} onClick={() => scrollTo(index)} />
        ))}
      </div>
    </div>
  );
}
