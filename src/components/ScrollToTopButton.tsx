
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const PRIMARY_GREEN = "#257b3c";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = docHeight === 0 ? 0 : Math.min(Math.max(scrollY / docHeight, 0), 1);
      setFill(percent);
      setShow(scrollY > 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animate fill from bottom up
  // When above 50%, arrow turns green; below 50% it's white.
  return (
    <div style={{
      position: "fixed",
      right: 24,
      bottom: 104,
      zIndex: 10101,
      display: show ? "block" : "none",
      transition: "opacity 0.2s",
    }}>
      <button
        aria-label="Scroll to top"
        onClick={handleClick}
        className="shadow-lg hover:scale-110 focus:outline-none transition-all duration-200"
        style={{
          borderRadius: "50%",
          width: 48,
          height: 48,
          background: PRIMARY_GREEN,
          border: "2px solid #e6fbe2",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 18px 0px rgba(37,123,60,0.16)",
          padding: 0,
        }}
      >
        {/* Fill layer (animated) */}
        <svg width={48} height={48} viewBox="0 0 48 48" style={{ position: "absolute", top: 0, left: 0, zIndex: 1, pointerEvents: "none" }}>
          <rect
            x={0}
            y={48 - 48 * fill}
            width={48}
            height={48 * fill}
            fill="#fff"
          />
        </svg>
        <ArrowUp
          className="m-auto transition-colors duration-200"
          size={24}
          color={fill >= 0.5 ? PRIMARY_GREEN : "#fff"}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            transition: "color 0.2s",
          }}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
