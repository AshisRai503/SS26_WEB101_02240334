import { useEffect, useState } from "react";

export default function useIntersectionObserver({
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  freezeOnceVisible = false,
} = {}) {
  const [ref, setRef] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && freezeOnceVisible) {
          observer.disconnect();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, root, rootMargin, threshold, freezeOnceVisible]);

  return [setRef, isIntersecting];
}