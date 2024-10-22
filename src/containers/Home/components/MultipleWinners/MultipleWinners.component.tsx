'use client';

import React from 'react';
import { useMultipleWinners } from '@/hooks';
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
import { DataState } from '@/components/table';
import { YearWithWinners } from '@/models';

export function MultipleWinnersComponent() {
  const { data, loading, error } = useMultipleWinners();

  return (
    <Card>
      <CardHeader>
        <h2>List years with multiple winners</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Win Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <DataState<YearWithWinners>
              data={data?.years}
              loading={loading}
              error={error}
              colSpan={2}
              render={(response) =>
                response.map((year) => (
                  <TableRow key={year.year}>
                    <TableCell>{year.year}</TableCell>
                    <TableCell>{year.winnerCount}</TableCell>
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
