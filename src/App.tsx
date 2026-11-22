import { Component, useEffect, useRef, useState } from 'react'

import './App.css'
import { Slide1 } from './pages/Slide1';
import { Slide2 } from './pages/Slide2';
import { Slide3 } from './pages/Slide3';

const COMPONENTS_MAP: Record<string, React.ComponentType<any>> = {
  Slide1,
  Slide2,
  Slide3
};

function App() {
  const SLIDES = [
    {
      id: 0, title: 'Шаг 1: Идея', text: 'Прокрутите колесо или свайпните вверх', iconUrl: '/icons/dryer.svg', // Путь к файлу в папке public/icons/
      bg: '#0f172a', componentName: 'Slide1'
    },
    {
      id: 1, title: 'Шаг 2: Разработка', text: 'Переключение строго по одному слайду', iconUrl: '/icons/wheel.svg', // Путь к файлу в папке public/icons/
      bg: '#0f172a', componentName: 'Slide2'
    },
    {
      id: 2, title: 'Шаг 3: Запуск', text: 'Финальный экран презентации', iconUrl: '/icons/feather.svg', // Путь к файлу в папке public/icons/
      bg: '#0f172a', componentName: 'Slide3'
    },
  ];

  const ICON_ANGLES = [-14, 0, 14];
  const ARC_RADIUS = 372;
  const ACTIVE_OFFSET = 18;
  const ARC_BORDER = 10;

  const [currentSlide, setCurrentSlide] = useState(0);

  const isAnimating = useRef(false);
  const wheelLock = useRef(false);
  const wheelTimeout: React.RefObject<null | number> = useRef(null);
  const touchStartY = useRef(0);

  const ANIMATION_DURATION = 800; // Длительность перехода в мс

  const goToSlide = (index: number) => {
    if (index < 0 || index >= SLIDES.length || index === currentSlide || isAnimating.current) {
      return;
    }

    isAnimating.current = true;
    setCurrentSlide(index);

    setTimeout(() => {
      isAnimating.current = false;
    }, ANIMATION_DURATION);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (wheelTimeout.current) {
      clearTimeout(wheelTimeout.current);
    }

    wheelTimeout.current = setTimeout(() => {
      wheelLock.current = false;
    }, 50);

    if (isAnimating.current || wheelLock.current || Math.abs(e.deltaY) < 15) {
      return;
    }

    wheelLock.current = true;

    if (e.deltaY > 0) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(currentSlide - 1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (isAnimating.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide])

  return (
    <div className="viewport">
      {/* Левая навигация с дугой */}
      <aside className="arc-nav">
        <div
          className="arc-circle"
          style={{ width: ARC_RADIUS * 2, height: ARC_RADIUS * 2 }}
        >
          {SLIDES.map((slide, idx) => {
            const isActive = currentSlide === idx;
            const angleRad = (ICON_ANGLES[idx] * Math.PI) / 180;

            const center = ARC_RADIUS - ARC_BORDER;
            const baseRadius = ARC_RADIUS - ARC_BORDER / 2;
            const currentRadius = isActive ? baseRadius + ACTIVE_OFFSET : baseRadius;

            const x = center + currentRadius * Math.cos(angleRad);
            const y = center + currentRadius * Math.sin(angleRad);

            return (
              <button
                key={slide.id}
                className={`arc-icon ${isActive ? 'active' : ''}`}
                style={{ left: `${x}px`, top: `${y}px` }}
                onClick={() => goToSlide(idx)}
                aria-label={slide.title}
              >
                <span
                  className="svg-icon"
                  style={{
                    maskImage: `url(${slide.iconUrl})`,
                    WebkitMaskImage: `url(${slide.iconUrl})`,
                  }}
                />
              </button>
            );
          })}
        </div>
      </aside>
      <main
        className="slides-wrapper"
        style={{
          transform: `translate3d(0, -${currentSlide * 100}dvh, 0)`,
          transitionDuration: `${ANIMATION_DURATION}ms`,
        }}
      >
        {SLIDES.map((slide) => {
          const DynamicComponent = COMPONENTS_MAP[slide.componentName];

          return (
            <section
              key={slide.id}
              className="slide"
            >
              <div className="slide-image-wrapper">
                <DynamicComponent />
              </div>
            </section>
          )
        })}
      </main>
    </div>
  );
}

export default App
