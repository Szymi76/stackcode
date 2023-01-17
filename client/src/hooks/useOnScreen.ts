// from https://usehooks.com/useOnScreen/

import { useState, useEffect, useRef, MutableRefObject } from "react";

function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  options: { once: boolean; rootMargin: string } = { once: true, rootMargin: "0px" }
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  let done = false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires

        // if (done) return;

        if (entry.isIntersecting) done = true;
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: options.rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}

export default useOnScreen;
