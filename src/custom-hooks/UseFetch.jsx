import React, { useEffect, useState, useRef, useCallback } from "react";

// Custom Hook for Infinite Scroll Data Fetching
const useInfiniteScroll = (apiUrl, limit = 10) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}?limit=${limit}&skip=${page * limit}`
      );
      const result = await response.json();

      if (result.products && result.products.length > 0) {
        setData((prev) => {
          // Filter out duplicates based on product ID
          const existingIds = new Set(prev.map((p) => p.id));
          const newProducts = result.products.filter(
            (p) => !existingIds.has(p.id)
          );
          return [...prev, ...newProducts];
        });
        setPage((prev) => prev + 1);

        // Check if we've loaded all products
        if (result.skip + result.limit >= result.total) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [apiUrl, limit, page, hasMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    isFetchingRef.current = false;
  }, []);

  return { data, loading, error, hasMore, fetchData, reset, isFetchingRef };
};

export default useInfiniteScroll;
