import { useEffect, useRef } from "react";

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let dot = { x: mouse.x, y: mouse.y };
    let ring = { x: mouse.x, y: mouse.y };

    // 1. MASSIVE SPEED DIFFERENCE FOR MAXIMUM SEPARATION
    const dotSpeed = 1;      // Dot sticks exactly to the mouse instantly
    const ringSpeed = 0.006;  // Ring heavily lags behind

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    let raf;

    const animate = () => {
      // Both track the raw mouse
      dot.x += (mouse.x - dot.x) * dotSpeed;
      dot.y += (mouse.y - dot.y) * dotSpeed;

      ring.x += (mouse.x - ring.x) * ringSpeed;
      ring.y += (mouse.y - ring.y) * ringSpeed;

      // 2. BULLETPROOF CENTERING
      // translate(-50%, -50%) forces them to stay perfectly centered regardless of their width/height
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();

    const interactive = document.querySelectorAll(
      "a, button, .btn, input, textarea, select"
    );

    const enter = () => {
      ringRef.current?.classList.add("cursor-hover");
      dotRef.current?.classList.add("cursor-hover");
    };

    const leave = () => {
      ringRef.current?.classList.remove("cursor-hover");
      dotRef.current?.classList.remove("cursor-hover");
    };

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef}></div>
      <div className="cursor-dot" ref={dotRef}></div>
    </>
  );
}