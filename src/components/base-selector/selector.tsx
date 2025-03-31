"use client";

import styles from "./Selector.module.css";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { selectorContext } from "./selector-provider";
import { useBoolean } from "./use-boolean";

/**
 * Selector Props
 */
export interface SelectorProps
  extends Readonly<React.ComponentProps<"button">> {
  readonly checked?: boolean;
  readonly onCheckedChange?: (checked: boolean) => void;
  readonly children: ReactNode;
}

/**
 * Selector component
 */
export function Selector({ children, ...props }: SelectorProps) {
  const menu = useBoolean(false);
  const { value } = useContext(selectorContext);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        menu.value
      ) {
        menu.onFalse();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  return (
    <div className={styles.selectorWrapper} ref={wrapperRef}>
      <button
        type="button"
        {...props}
        className={styles.selectorButton}
        onClick={menu.onToggle}
      >
        <span className={styles.placeholder}>{value}</span>
        <div className={styles.iconSelector} />
      </button>
      {menu.value && <div className={styles.childrenContainer}>{children}</div>}
    </div>
  );
}
