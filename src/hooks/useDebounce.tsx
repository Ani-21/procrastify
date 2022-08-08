import React, { useState, useEffect } from "react";
import { clearInterval } from "timers";

function useDebounce<T>(input: string, delay?: number): string {
  const [debounce, setDebounce] = useState<string>(input);

  useEffect(() => {
    const timer = setTimeout(() => setDebounce(input), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input, delay]);
  return debounce;
}

export default useDebounce;