import { useState, useEffect } from "react";

// данный hook позволяет откладывать
// поиск запроса на некоторое время
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
