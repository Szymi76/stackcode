import { useEffect } from "react";

type useOpenImagesArgs = {
  containerClass: string;
};

const useOpenImages = (containerClass: string) => {
  useEffect(() => {
    const container = document.getElementsByClassName(containerClass)[0];
    if (!container || !(container instanceof HTMLDivElement)) return;

    const imgTags = container.getElementsByTagName("img");

    const openInNewCard = (url: string) => window.open(url, "_blank");

    for (var i = 0; i < imgTags.length; i++) {
      const img = imgTags[i];
      img.addEventListener("click", () => openInNewCard(img.src));
    }

    return () => {
      for (var i = 0; i < imgTags.length; i++) {
        const img = imgTags[i];
        img.removeEventListener("click", () => openInNewCard(img.src));
      }
    };
  }, []);
};

export default useOpenImages;
