import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({hasMore, isLoading, loadMore, rootMargin, threshold = 0}) => {

    const observerRef = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
        if (!hasMore) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isLoading) {
                    loadMore();
                }
            },
            {
                root: null,
                rootMargin,
                threshold
            }
        );

        const el = targetRef.current;
        if (el) observerRef.current.observe(el);

        return () => {
            if (el) observerRef.current.unobserve(el);
        };
    }, [hasMore, isLoading, loadMore]);

    return targetRef;
};