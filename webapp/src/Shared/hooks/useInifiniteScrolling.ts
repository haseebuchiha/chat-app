import { useEffect, useRef, useState } from "react";

interface IUseInfiniteScrolling {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchMore: any;
  endCursor?: string | null | undefined;
  hasNextPage?: boolean;
}
const useInifiteScrolling = ({
  endCursor,
  hasNextPage,
  fetchMore,
}: IUseInfiniteScrolling) => {
  const [loadingMore, setIsLoadinMore] = useState(false);
  const observerTarget = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setIsLoadinMore(true);
          fetchMore({
            variables: {
              after: endCursor,
            },
          }).finally(() => setIsLoadinMore(false));
        }
      },
      { threshold: 1 },
    );
    const observerCurrent = observerTarget.current;

    if (observerCurrent) {
      observer.observe(observerCurrent);
    }

    return () => {
      if (observerCurrent) {
        observer.unobserve(observerCurrent);
      }
    };
  }, [endCursor, hasNextPage, fetchMore, observerTarget]);

  return {
    loadingMore,
    observerTarget,
  };
};

export default useInifiteScrolling;
