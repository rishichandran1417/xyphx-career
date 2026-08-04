import { useEffect, useState } from "react";

export default function Background() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const mobileOrReducedMotion = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");

    if (mobileOrReducedMotion.matches) {
      setScrollY(0);
      return undefined;
    }

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="bg-image"
      style={{
        transform: `translateY(${scrollY * 0.2}px) scale(${1 + scrollY * 0.00008})`,
      }}
    />
  );
}
