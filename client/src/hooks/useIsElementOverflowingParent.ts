import { RefObject, useLayoutEffect, useState } from "react";

type Options = {
  margin: number;
};

const useIsElementOverflowingParent = <T>(ref: RefObject<T>, options?: Options) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useLayoutEffect(() => {
    // funkcja sprawdza czy element znajduję się poza rodzicem
    const handleResize = (e?: UIEvent) => {
      if (!ref.current) return;
      const element = ref.current;
      // @ts-ignore
      const elementRect = element.getBoundingClientRect();
      // @ts-ignore
      const parentRect = element!.parentNode.getBoundingClientRect();
      const localIsOverflowing = elementRect.right + options?.margin > parentRect.right;
      setIsOverflowing(localIsOverflowing);
    };

    // domyślne sprawdzenie po załadowaniu strony
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isOverflowing;
};

export default useIsElementOverflowingParent;
