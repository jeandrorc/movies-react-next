import React from 'react';
import { FilterState } from '@/hooks/useFilters';
import { Button } from '@/components/ui';
import { Select } from '@/components/form/Select';

interface YearFilterProps {
  filters: FilterState;
}

// Conversão do booleano para string
const bolToString = (bol: boolean | undefined) => {
  if (bol === undefined) return 'none';
  return bol ? 'yes' : 'no';
};

const stringToBol = (str: string) => {
  if (str === 'none') return undefined;
  return str === 'yes';
};

export function WinnersFilter({ filters }: YearFilterProps) {
  return (
    <div>
      {filters.winnerFilter === undefined && (
        <Select
          options={[
            { value: 'none', label: 'All' },
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          value={bolToString(filters.winnerFilter)}
          onChange={(value) => filters.handleWinnerChange(stringToBol(value))}
          placeholder="Filter by winner"
        />
      )}

      {filters.winnerFilter !== undefined && (
        <div className="flex items-center p-2">
          <Button
            variant="outline"
            size="xxs"
            onClick={() => filters.handleWinnerChange(undefined)}
            className="ml-2 text-red-500"
          >
            {filters.winnerFilter ? 'Yes' : 'No'} x
          </Button>
        </div>
      )}
    </div>
  );
}
