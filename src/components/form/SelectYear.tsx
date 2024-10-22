'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';

interface SelectYearProps {
  minYear: number;
  maxYear: number;
  value?: string;
  onChange: (year: string) => void;
  placeholder?: string;
}

export const SelectYear: React.FC<SelectYearProps> = ({
  minYear,
  maxYear,
  onChange,
  value,
  placeholder = 'Search by year',
}) => {
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i,
  );

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select value={`${value}`} onValueChange={handleChange}>
      <SelectTrigger className="w-full" aria-haspopup="listbox">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {years.map((year) => (
            <SelectItem key={year} value={`${year}`}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
