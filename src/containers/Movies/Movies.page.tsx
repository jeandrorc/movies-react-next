'use client';
import React from 'react';
import { PageWithBreadcrumb } from '@/components/pages/PageWithBreadcrumb';
import { useMovies } from '@/hooks/useMovies';
import { useFilters } from '@/hooks/useFilters';
import { usePagination } from '@/hooks/usePagination';
import { MoviesTable } from '@/containers/Movies/components/MoviesTable';
import { Pagination } from '@/components/table';
import { Card, CardContent } from '@/components/ui';

export function MoviesPage() {
  const filters = useFilters();

  const memoizedFilters = React.useMemo(
    () => ({
      winnerFilter: filters.winnerFilter,
      yearFilter: filters.yearFilter,
    }),
    [filters.winnerFilter, filters.yearFilter],
  );

  const { page, handlePageChange } = usePagination(memoizedFilters);

  const { data, loading, error } = useMovies({
    page: page,
    size: 20,
    winner: memoizedFilters.winnerFilter,
    year: memoizedFilters.yearFilter,
  });

  return (
    <PageWithBreadcrumb pages={[{ name: 'Movies' }]}>
      <Card>
        <CardContent>
          <MoviesTable
            data={data}
            loading={loading}
            error={error}
            filters={filters}
          />
          <Pagination
            currentPage={page}
            totalPages={data?.totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </PageWithBreadcrumb>
  );
}
