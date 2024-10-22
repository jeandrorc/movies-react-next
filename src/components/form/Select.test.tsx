import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import '@testing-library/jest-dom';

describe('Select Component', () => {
  const mockOnChange = vi.fn();

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders all options correctly', () => {
    render(<Select options={options} onChange={mockOnChange} />);

    fireEvent.click(screen.getByRole('combobox')); // Open the dropdown

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange with the correct value when an option is selected', () => {
    render(<Select options={options} onChange={mockOnChange} />);

    fireEvent.click(screen.getByRole('combobox')); // Open the dropdown
    fireEvent.click(screen.getByText('Option 2')); // Select an option

    expect(mockOnChange).toHaveBeenCalledWith('2');
  });

  it('displays the selected value correctly', () => {
    render(<Select options={options} value="1" onChange={mockOnChange} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Option 1');
  });

  it('updates the selected value when a new option is chosen', () => {
    const { rerender } = render(
      <Select options={options} value="1" onChange={mockOnChange} />,
    );

    fireEvent.click(screen.getByRole('combobox')); // Open the dropdown
    fireEvent.click(screen.getByText('Option 3')); // Select a new option

    expect(mockOnChange).toHaveBeenCalledWith('3');

    rerender(<Select options={options} value="3" onChange={mockOnChange} />);

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Option 3');
  });
});
