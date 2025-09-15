import { useCallback, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type TimeoutOptions = {
  delay: number;
};

export default function useFetch<T>(asyncFuntion: () => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(
    async ({ delay }: TimeoutOptions) => {
      setState({ data: null, loading: true, error: null });

      try {
        if (delay) {
          await new Promise((res) => setTimeout(res, delay));
        }
        const result = await asyncFuntion();
        setState({ data: result, loading: false, error: null });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: (error as Error).message || "An error occurred",
        });
      }
    },
    [asyncFuntion]
  );

  return { ...state, fetchData };
}
