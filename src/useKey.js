import { useEffect } from "react";

export const useKey = (key, action) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action?.();
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, [key, action]);
};
