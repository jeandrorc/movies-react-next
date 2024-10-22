import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectYear } from './SelectYear';
import '@testing-library/jest-dom';

describe('SelectYear Component', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all years within the range', () => {
    render(
      <SelectYear minYear={2020} maxYear={2023} onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByRole('combobox')); // Open the dropdown

    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('calls onChange with the correct value when a year is selected', () => {
    render(
      <SelectYear minYear={2020} maxYear={2023} onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByRole('combobox')); // Open the dropdown
    fireEvent.click(screen.getByText('2022')); // Select a year

    expect(mockOnChange).toHaveBeenCalledWith('2022');
  });

  it('displays the selected year correctly', () => {
    render(
      <SelectYear
        minYear={2020}
        maxYear={2023}
        value="2021"
        onChange={mockOnChange}
      />,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('2021');
  });

  it('updates the selected year when a new year is chosen', () => {
    const { rerender } = render(
      <SelectYear
        minYear={2020}
        maxYear={2023}
        value="2021"
        onChange={mockOnChange}
      />,
    );

    fireEvent.click(screen.getByRole('combobox')); // Open the dropdown
    fireEvent.click(screen.getByText('2023')); // Select a new year

    expect(mockOnChange).toHaveBeenCalledWith('2023');

    rerender(
      <SelectYear
        minYear={2020}
        maxYear={2023}
        value="2023"
        onChange={mockOnChange}
      />,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('2023');
  });
});
