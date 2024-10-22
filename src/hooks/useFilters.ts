import { useCallback, useMemo, useState } from 'react';

export interface FilterState {
  yearFilter: number | undefined;
  winnerFilter: boolean | undefined;
  handleYearChange: (year: number | undefined) => void;
  handleWinnerChange: (winner: boolean | undefined) => void;
}

export function useFilters(): FilterState {
  const [yearFilter, setYearFilter] = useState<number | undefined>(undefined);
  const [winnerFilter, setWinnerFilter] = useState<boolean | undefined>(
    undefined,
  );

  const handleYearChange = useCallback((year: number | undefined) => {
    setYearFilter(year);
  }, []);

  const handleWinnerChange = useCallback((winner: boolean | undefined) => {
    setWinnerFilter(winner);
  }, []);

  const memoizedFilters = useMemo(() => {
    return {
      yearFilter,
      winnerFilter,
    };
  }, [yearFilter, winnerFilter]);

  return {
    yearFilter: memoizedFilters.yearFilter,
    winnerFilter: memoizedFilters.winnerFilter,
    handleYearChange,
    handleWinnerChange,
  };
}
