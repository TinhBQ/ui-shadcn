import { useEffect, useRef, useState } from "react";

export const useMenuPosition = (defaultLeft: boolean = true, defaultTop: boolean = false) => {
  const [isMenuLeft, setIsMenuLeft] = useState(defaultLeft);
  const [isMenuTop, setIsMenuTop] = useState<boolean | null>(defaultTop);

  const subMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (subMenuRef.current) {
      const { right, left, bottom, top, height } = subMenuRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if (!isMenuLeft && right > windowWidth) {
        setIsMenuLeft(true);
      }

      if (isMenuLeft && left < 0) {
        setIsMenuLeft(false);
      }

      if (bottom > windowHeight && top - height < 0) {
        setIsMenuTop(null);
      } else if (!isMenuTop && bottom > windowHeight) {
        setIsMenuTop(true);
      } else if (isMenuTop && top - height < 0) {
        setIsMenuTop(false);
      }
    }
  }, [isMenuLeft, isMenuTop]);

  return { isMenuLeft, isMenuTop, subMenuRef };
};
