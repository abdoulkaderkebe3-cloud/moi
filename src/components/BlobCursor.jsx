import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

export default function BlobCursor({
  blobType = "circle",
  fillColor = "#8b5cf6",
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = "rgba(255, 255, 255, 0.8)",
  opacities = [0.15, 0.1, 0.05],
  shadowColor = "rgba(0, 0, 0, 0.15)",
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = "blob-filter-skills",
  filterStdDeviation = 30,
  filterColorMatrixValues = "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = "power3.out",
  slowEase = "power1.out",
  zIndex = 0
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const getContainerOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e) => {
      const { left, top } = getContainerOffset();
      const clientX = "clientX" in e ? e.clientX : e.touches[0].clientX;
      const clientY = "clientY" in e ? e.clientY : e.touches[0].clientY;

      const x = clientX - left;
      const y = clientY - top;

      blobsRef.current.forEach((blob, index) => {
        if (!blob) return;
        const isLead = index === 0;
        gsap.to(blob, {
          x,
          y,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase,
          overwrite: "auto"
        });
      });
    },
    [getContainerOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    parent.addEventListener("mousemove", handleMove);
    parent.addEventListener("touchmove", handleMove, { passive: true });

    const handleResize = () => getContainerOffset();
    window.addEventListener("resize", handleResize);

    return () => {
      parent.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("touchmove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMove, getContainerOffset]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .blob-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .blob-main {
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: transparent;
          user-select: none;
        }

        .blob {
          position: absolute;
          will-change: transform;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .inner-dot {
          position: absolute;
          pointer-events: none;
        }
      `}} />

      <div
        ref={containerRef}
        className="blob-container"
        style={{ zIndex }}
      >
        {useFilter && (
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <filter id={filterId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation={filterStdDeviation} result="blur" />
              <feColorMatrix in="blur" values={filterColorMatrixValues} />
            </filter>
          </svg>
        )}

        <div
          className="blob-main"
          style={{ filter: useFilter ? `url(#${filterId})` : undefined }}
        >
          {Array.from({ length: trailCount }).map((_, index) => (
            <div
              key={index}
              ref={(el) => {
                blobsRef.current[index] = el;
              }}
              className="blob"
              style={{
                width: sizes[index] || sizes[sizes.length - 1] || 80,
                height: sizes[index] || sizes[sizes.length - 1] || 80,
                borderRadius: blobType === "circle" ? "50%" : "0%",
                backgroundColor: fillColor,
                opacity: opacities[index] || opacities[opacities.length - 1] || 0.1,
                boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
              }}
            >
              <div
                className="inner-dot"
                style={{
                  width: innerSizes[index] || innerSizes[innerSizes.length - 1] || 25,
                  height: innerSizes[index] || innerSizes[innerSizes.length - 1] || 25,
                  top: ((sizes[index] || sizes[sizes.length - 1] || 80) - (innerSizes[index] || innerSizes[innerSizes.length - 1] || 25)) / 2,
                  left: ((sizes[index] || sizes[sizes.length - 1] || 80) - (innerSizes[index] || innerSizes[innerSizes.length - 1] || 25)) / 2,
                  backgroundColor: innerColor,
                  borderRadius: blobType === "circle" ? "50%" : "0%"
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
