import { useEffect, useRef, useState, useCallback } from 'react';

type PaginatedResponse<T> = {
    data: T[];
    totalResults: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    nextPage: number | null;
};

export function useInfiniteScrollRtk<T>(
    fetcher: (params: { page: number; limit: number }) => Promise<PaginatedResponse<T>>,
    deps: unknown[] = [],
    limit = 20
) {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // 👇 reset and fetch page 1 when deps change
    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            setPage(1);
            setHasMore(true);
            setData([]);
            try {
                const res = await fetcher({ page: 1, limit });
                setData(res.data);
                setHasMore(res.hasNextPage);
                if (res.nextPage) setPage(res.nextPage);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInitial();
    }, deps); // run on filter change

    const loadMore = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await fetcher({ page, limit });
            setData(prev => [...prev, ...res.data]);
            setHasMore(res.hasNextPage);
            if (res.nextPage) setPage(res.nextPage);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [page, hasMore, fetcher, loading, limit]);

    // 👇 attach scroll observer to bottomRef
    useEffect(() => {
        if (!bottomRef.current || !hasMore) return;

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        }, { threshold: 1 });

        observer.observe(bottomRef.current);
        return () => observer.disconnect();
    }, [bottomRef, hasMore, loadMore]);

    const reset = () => {
        setData([]);
        setPage(1);
        setHasMore(true);
        setError(null);
    };

    return {
        data,
        loading,
        error,
        bottomRef,
        reset,
        fetchMore: loadMore,
        hasMore,
    };
}
