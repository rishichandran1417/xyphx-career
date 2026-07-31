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

    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    let dot = {
      x: mouse.x,
      y: mouse.y,
    };

    let ring = {
      x: mouse.x,
      y: mouse.y,
    };

    const dotSpeed = 0.45;
    const ringSpeed = 0.08;

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    let raf;

    const animate = () => {
      // Dot follows mouse
      dot.x += (mouse.x - dot.x) * dotSpeed;
      dot.y += (mouse.y - dot.y) * dotSpeed;

      // Ring follows dot
      ring.x += (dot.x - ring.x) * ringSpeed;
      ring.y += (dot.y - ring.y) * ringSpeed;

      dotRef.current.style.transform =
        `translate3d(${dot.x - 3}px, ${dot.y - 3}px, 0)`;

      ringRef.current.style.transform =
        `translate3d(${ring.x - 14}px, ${ring.y - 14}px, 0)`;

      raf = requestAnimationFrame(animate);
    };

    animate();

    const interactive = document.querySelectorAll(
      "a,button,.btn,input,textarea,select"
    );

    const enter = () => {
      ringRef.current.classList.add("cursor-hover");
      dotRef.current.classList.add("cursor-hover");
    };

    const leave = () => {
      ringRef.current.classList.remove("cursor-hover");
      dotRef.current.classList.remove("cursor-hover");
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