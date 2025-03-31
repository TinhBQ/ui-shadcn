"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

/**
 * Selector Context Props
 */
interface SelectorContextProps {
  readonly value?: string;
  readonly updateValue?: (value: string) => void;
}

/**
 * Selector Context
 */
export const selectorContext = createContext<SelectorContextProps>({});

/**
 * Selector Provider Props
 */
interface SelectorProviderProps {
  readonly children: ReactNode;
}

/**
 * Selector Provider
 */
export function SelectorProvider({ children }: SelectorProviderProps) {
  const [value, setValue] = useState<string>("");

  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);
    console.log("value updated");
  }, []);

  const contextValue = useMemo(
    () => ({ value, updateValue }),
    [value, updateValue]
  );

  return (
    <selectorContext.Provider value={contextValue}>
      {children}
    </selectorContext.Provider>
  );
}
