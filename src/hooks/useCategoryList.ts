import axios, { type CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';
import type { Character, Episode, Location } from '@/components/Category';

interface useCategoryListProps {
  pageNumber: number;
  url: string;
}

export function useCategoryList(props: useCategoryListProps) {
  const { pageNumber, url } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<Character[] | Episode[] | Location[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setItems([]);
  }, [url]);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(false);
    let cancel: CancelTokenSource;
    axios({
      method: 'GET',
      url,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken(c => {
        cancel = { cancel: c } as CancelTokenSource;
      })
    })
      .then(res => {
        setItems(prev => [...prev, ...res.data.results]);
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch(e => {
        if (axios.isCancel(e)) {
          return;
        }
        setError(false);
        console.error(e);
      });

    return () => {
      cancel.cancel();
    };
  }, [pageNumber, url]);

  return {
    loading,
    error,
    items,
    hasMore
  };
}
