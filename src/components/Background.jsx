import { useEffect } from "react";

export default function Background() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = null;

    const updatePosition = () => {
      frameId = null;
      if (reducedMotion.matches) return;

      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("--background-parallax", `${scrollY * 0.18}px`);
      document.documentElement.style.setProperty("--background-scale", `${1 + Math.min(scrollY * 0.00004, 0.08)}`);
    };

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updatePosition);
    };

    const resetForReducedMotion = () => {
      if (reducedMotion.matches) {
        document.documentElement.style.setProperty("--background-parallax", "0px");
        document.documentElement.style.setProperty("--background-scale", "1");
      } else {
        updatePosition();
      }
    };

    updatePosition();
    window.addEventListener("scroll", handleScroll, { passive: true });
    reducedMotion.addEventListener("change", resetForReducedMotion);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      reducedMotion.removeEventListener("change", resetForReducedMotion);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      document.documentElement.style.removeProperty("--background-parallax");
      document.documentElement.style.removeProperty("--background-scale");
    };
  }, []);

  return <div className="bg-image" aria-hidden="true" />;
}
