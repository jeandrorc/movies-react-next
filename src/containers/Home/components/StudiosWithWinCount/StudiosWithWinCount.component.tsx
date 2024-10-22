'use client';

import React from 'react';
import { useStudiosWithWinCount } from '@/hooks';
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
import { StudioWithWinCount } from '@/models';

export function StudiosWithWinCountComponent() {
  const { data, loading, error } = useStudiosWithWinCount(3);

  return (
    <Card>
      <CardHeader>
        <h2>Top 3 studios with winners</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Win Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <DataState<StudioWithWinCount>
              data={data?.studios}
              colSpan={2}
              loading={loading}
              error={error}
              render={(studios) =>
                studios.map((studio) => (
                  <TableRow key={studio.name}>
                    <TableCell>{studio.name}</TableCell>
                    <TableCell>{studio.winCount}</TableCell>
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
