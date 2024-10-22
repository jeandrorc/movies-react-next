import { useState, useEffect } from 'react';

export function usePagination<T>(dependencies: T[]) {
  const [page, setPage] = useState(0);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [dependencies]);

  return {
    page,
    handlePageChange,
  };
}
