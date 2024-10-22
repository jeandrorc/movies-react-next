'use client';

import React from 'react';
import { useMovieByYear } from '@/hooks';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { SelectYear } from '@/components/form';
import { DataState } from '@/components/table';
import { Movie } from '@/models';

const currentYear = new Date().getFullYear();

export function MoviesByYearComponent() {
  const [year, setYear] = React.useState<string | undefined>(`${currentYear}`);
  const { data, loading, error } = useMovieByYear(year);

  return (
    <Card>
      <CardHeader>
        <h2>List movie winners by year</h2>
      </CardHeader>
      <CardContent>
        <SelectYear
          minYear={1960}
          maxYear={currentYear}
          onChange={setYear}
          value={year}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <DataState<Movie>
              loading={loading}
              data={data}
              error={error}
              render={(movies) =>
                movies.map((movie) => (
                  <TableRow key={movie}>
                    <TableCell>{movie.id}</TableCell>
                    <TableCell>{movie.year}</TableCell>
                    <TableCell>{movie.title}</TableCell>
                  </TableRow>
                ))
              }
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
