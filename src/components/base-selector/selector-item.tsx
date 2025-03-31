"use client";

import { HTMLAttributes, ReactNode, useCallback, useContext } from "react";
import { selectorContext } from "./selector-provider";

/**
 * Select Item Props
 */
export interface SelectItemProps
  extends Readonly<Omit<HTMLAttributes<HTMLButtonElement>, "onClick">> {
  readonly value: string;
  readonly onClick?: () => void;
  readonly children: ReactNode;
}

/**
 * Select Item
 */
export function SelectItem({
  value,
  onClick,
  children,
  ...props
}: SelectItemProps) {
  const { updateValue } = useContext(selectorContext);

  const handleClick = useCallback(() => {
    console.log("handleClick");
    if (onClick) {
      onClick();
    }

    if (updateValue) {
      updateValue(value);
      console.log("updateValue");
    }
  }, [onClick, updateValue, value]);

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
