"use client";

import { useCallback, useState } from "react";
import styles from "./Switch.module.css";
import React from "react";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleClick = useCallback(() => {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      if (onCheckedChange) {
        onCheckedChange(newChecked);
      }
    }, [isChecked, onCheckedChange]);

    return (
      <button
        ref={ref}
        className={`${styles.switch} ${isChecked ? styles.checked : ""}`}
        onClick={() => handleClick()}
        type="button"
        {...props}
      >
        <span
          className={`${styles.thumb} ${isChecked ? styles.thumbChecked : ""}`}
        />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
