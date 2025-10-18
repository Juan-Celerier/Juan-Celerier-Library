import { useState, useEffect } from "react";

export const useMockData = <T>(mockData: T[], delay: number = 500) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [mockData, delay]);

  return { data, isLoading };
};
