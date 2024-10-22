'use client';

import React from 'react';
import { useWinIntervals } from '@/hooks';
import {
  Card,
  CardContent,
  CardHeader,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { DataState } from '@/components/table';
import { ProducerWinInterval } from '@/models';

export function WinByIntervals() {
  const { data, loading, error } = useWinIntervals();

  return (
    <Card>
      <CardHeader>
        <h2>Producers with longest and shortest interval between wins</h2>
      </CardHeader>
      <CardContent>
        <Label>Maximum</Label>
        <Table aria-label="Maximum Section">
          <TableHeader>
            <TableRow>
              <TableHead>Producer</TableHead>
              <TableHead>Interval</TableHead>
              <TableHead>Previous Year</TableHead>
              <TableHead>Following Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <DataState<ProducerWinInterval>
              data={data?.max || []}
              colSpan={4}
              error={error}
              loading={loading}
              render={(item) =>
                item.map((producer) => (
                  <TableRow key={producer.producer}>
                    <TableCell width={200}>{producer.producer}</TableCell>
                    <TableCell>{producer.interval}</TableCell>
                    <TableCell>{producer.previousWin}</TableCell>
                    <TableCell>{producer.followingWin}</TableCell>
                  </TableRow>
                ))
              }
            />
          </TableBody>
        </Table>

        <Label>Minimum</Label>
        <Table aria-label="Minimum Section">
          <TableHeader>
            <TableRow>
              <TableHead>Producer</TableHead>
              <TableHead>Interval</TableHead>
              <TableHead>Previous Year</TableHead>
              <TableHead>Following Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <DataState<ProducerWinInterval>
              data={data?.min || []}
              colSpan={4}
              loading={loading}
              render={(item) =>
                item.map((producer) => (
                  <TableRow key={producer.producer}>
                    <TableCell width={200}>{producer.producer}</TableCell>
                    <TableCell>{producer.interval}</TableCell>
                    <TableCell>{producer.previousWin}</TableCell>
                    <TableCell>{producer.followingWin}</TableCell>
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
