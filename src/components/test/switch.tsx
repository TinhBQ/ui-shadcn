"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Switch.module.css";
import React from "react";

interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handleClick = useCallback(() => {
      if (disabled) return;
      setIsChecked((prev) => {
        const newChecked = !prev;
        if (onCheckedChange) {
          onCheckedChange(newChecked);
        }
        return newChecked;
      });
    }, [onCheckedChange, disabled]);

    return (
      <button
        ref={ref}
        className={`${styles.switch} ${isChecked ? styles.checked : ""} ${
          disabled ? styles.disabled : ""
        }`}
        onClick={handleClick}
        type="button"
        disabled={disabled}
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
