import React, { useEffect, useRef, useState } from 'react';

const slides = [
  { id: 1, img: 'images/adverts/1.png', alt: 'Low FX fees ad' },
  { id: 2, img: 'images/adverts/2.png', alt: 'Fast transfers ad' },
  { id: 3, img: 'images/adverts/3.png', alt: 'Secure payments ad' },
];

export default function AdsCarousel() {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, []);

  const move = (i) => setIdx((i + slides.length) % slides.length);

  return (
    <div className="card carousel_container">
      <h3>Sponsored</h3>
      <div className="carousel" aria-roledescription="carousel" aria-label="ads">
        <div
          className="carousel-track"
          ref={trackRef}
          style={{ width: `${slides.length * 100}%`, transform: `translateX(-${idx * (100 / slides.length)}%)` }}
        >
          {slides.map((s) => (
            <img key={s.id} src={s.img} alt={s.alt} />
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={() => move(idx - 1)} aria-label="Previous ad">◀</button>
        <span className="badge x_images_out_of_y">{idx + 1} / {slides.length}</span>
        <button onClick={() => move(idx + 1)} aria-label="Next ad">▶</button>
      </div>
    </div>
  );
}