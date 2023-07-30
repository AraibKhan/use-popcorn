import { useState, useEffect } from "react";

export const useLocalStorageState = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const stroedVal = JSON.parse(localStorage.getItem(key));
    return stroedVal ? stroedVal : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
