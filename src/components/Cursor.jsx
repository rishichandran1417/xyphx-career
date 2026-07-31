import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;

    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    let pos = {
      x: mouse.x,
      y: mouse.y,
    };

    const speed = 0.075; // Lower = smoother

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const animate = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      cursor.style.left = `${pos.x}px`;
      cursor.style.top = `${pos.y}px`;

      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", move);

    const interactive = document.querySelectorAll(
      "a,button,.btn,input,textarea,select"
    );

    const enter = () => cursor.classList.add("cursor-hover");
    const leave = () => cursor.classList.remove("cursor-hover");

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <div className="cursor" ref={cursorRef}>
      <div className="cursor-ring"></div>
      <div className="cursor-dot"></div>
    </div>
  );
}