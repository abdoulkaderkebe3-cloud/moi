import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black overflow-hidden [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const [size, setSize] = useState({ w: width, h: height });
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const isHovered = useRef(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const update = () => {
      const ww = window.innerWidth;
      if (ww < 480) setSize({ w: 260, h: 200 });
      else if (ww < 768) setSize({ w: 360, h: 280 });
      else if (ww < 1024) setSize({ w: 450, h: 360 });
      else setSize({ w: width, h: height });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [width, height]);

  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  const triggerNext = () => {
    if (order.current.length < 2 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);

    const [front, ...rest] = order.current;
    const elFront = refs[front].current;
    if (!elFront) {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        order.current = [...rest, front];
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }
    });
    tlRef.current = tl;

    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elFront, { zIndex: backSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );
  };

  const triggerPrev = () => {
    if (order.current.length < 2 || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setIsAnimating(true);

    const currentOrder = [...order.current];
    const back = currentOrder[currentOrder.length - 1];
    const frontSide = currentOrder.slice(0, currentOrder.length - 1);
    const elBack = refs[back].current;

    if (!elBack) {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        order.current = [back, ...frontSide];
        isAnimatingRef.current = false;
        setIsAnimating(false);
      }
    });
    tlRef.current = tl;

    // 1. Move the back card out of the stack (drop down)
    tl.to(elBack, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease
    });

    // 2. Shift all other cards backwards (slot i -> slot i + 1)
    tl.addLabel('demote', `-=${config.durDrop * config.promoteOverlap}`);
    frontSide.forEach((idx, i) => {
      const el = refs[idx].current;
      if (!el) return;
      const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'demote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease
        },
        `demote+=${(frontSide.length - 1 - i) * 0.15}`
      );
    });

    // 3. Bring the back card to the front slot (slot 0)
    const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `demote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => {
        gsap.set(elBack, { zIndex: frontSlot.zIndex });
      },
      undefined,
      'return'
    );
    tl.to(
      elBack,
      {
        x: frontSlot.x,
        y: frontSlot.y,
        z: frontSlot.z,
        duration: config.durReturn,
        ease: config.ease
      },
      'return'
    );
  };

  const triggerNextRef = useRef(triggerNext);
  triggerNextRef.current = triggerNext;

  const triggerPrevRef = useRef(triggerPrev);
  triggerPrevRef.current = triggerPrev;

  const startAutoplay = () => {
    stopAutoplay();
    if (isHovered.current && pauseOnHover) return;
    intervalRef.current = window.setInterval(() => {
      triggerNextRef.current();
    }, delay);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    if (isAnimatingRef.current) return;
    stopAutoplay();
    triggerNextRef.current();
    startAutoplay();
  };

  const handlePrev = () => {
    if (isAnimatingRef.current) return;
    stopAutoplay();
    triggerPrevRef.current();
    startAutoplay();
  };

  // Initial positioning
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });
  }, [cardDistance, verticalDistance, refs, skewAmount]);

  // IntersectionObserver: detect when visible on screen
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  // Autoplay setup — only runs when in view
  useEffect(() => {
    if (!isInView) {
      stopAutoplay();
      return;
    }

    startAutoplay();

    const node = container.current;
    if (!node) return () => stopAutoplay();

    const handleMouseEnter = () => {
      isHovered.current = true;
      if (pauseOnHover) {
        stopAutoplay();
      }
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      if (pauseOnHover) {
        startAutoplay();
      }
    };

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
      stopAutoplay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, pauseOnHover, isInView]);

  // Keyboard navigation when hovering
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered.current) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width: size.w, height: size.h, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div className="relative lg:absolute bottom-0 lg:right-0 mt-16 lg:mt-0 flex flex-col items-center">
      <div
        ref={container}
        className="relative transform perspective-[900px] overflow-visible scale-[0.7] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 lg:translate-x-[5%] lg:translate-y-[20%] lg:origin-bottom-right"
        style={{ width: size.w, height: size.h }}
      >
        {rendered}
      </div>

      {/* Navigation Buttons (completely outside the perspective/transform div!) */}
      <div className="flex items-center gap-6 select-none z-30 mt-6 lg:mt-24 lg:translate-x-[5%]">
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-violet-500/30 bg-slate-950/80 text-violet-400 hover:text-white hover:border-violet-500 hover:bg-violet-600/50 backdrop-blur-md transition-all duration-300 active:scale-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-lg shadow-violet-950/50"
          aria-label="Projet précédent"
        >
          <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-violet-500/30 bg-slate-950/80 text-violet-400 hover:text-white hover:border-violet-500 hover:bg-violet-600/50 backdrop-blur-md transition-all duration-300 active:scale-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-lg shadow-violet-950/50"
          aria-label="Projet suivant"
        >
          <ChevronRight size={24} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default CardSwap;
