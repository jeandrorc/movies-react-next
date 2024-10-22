import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table'; // Ajuste o caminho conforme necessário.
import { FaSpinner } from 'react-icons/fa'; // Usando spinner do react-icons.

interface DataStateProps<T> {
  data?: T[] | null;
  loading: boolean;
  error?: string | null;
  colSpan?: number;
  render: (data: T[]) => React.ReactNode;
  noDataMessage?: string;
  loadingMessage?: string;
}

export function DataState<T>({
  data,
  loading,
  error,
  colSpan = 3,
  render,
  noDataMessage = 'No data found',
  loadingMessage = 'Loading...',
}: DataStateProps<T>) {
  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} className="text-center py-6">
          <div className="flex justify-center items-center gap-2">
            <FaSpinner className="animate-spin text-xl" />
            <span>{loadingMessage}</span>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (error) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} className="text-center text-red-500 py-6">
          {error}
        </TableCell>
      </TableRow>
    );
  }

  if (!loading && (!data || data.length === 0)) {
    return (
      <TableRow>
        <TableCell colSpan={colSpan} className="text-center text-gray-500 py-6">
          {noDataMessage}
        </TableCell>
      </TableRow>
    );
  }

  return <>{render(data)}</>;
}
