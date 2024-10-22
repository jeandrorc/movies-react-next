import React from 'react';
import { render, screen } from '@testing-library/react';
import { MultipleWinnersComponent } from './MultipleWinners.component';
import { useMultipleWinners } from '@/hooks';
import '@testing-library/jest-dom';

vi.mock('@/hooks', () => ({
  useMultipleWinners: vi.fn(),
}));

describe('MultipleWinnersComponent', () => {
  const mockUseMultipleWinners = useMultipleWinners as jest.Mock;

  beforeEach(() => {
    mockUseMultipleWinners.mockClear();
  });

  it('renders the header correctly', () => {
    mockUseMultipleWinners.mockReturnValue({
      data: { years: [] },
      loading: false,
      error: null,
    });

    render(<MultipleWinnersComponent />);

    expect(
      screen.getByText('List years with multiple winners'),
    ).toBeInTheDocument();
  });

  it('displays loading state correctly', () => {
    mockUseMultipleWinners.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<MultipleWinnersComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state correctly', () => {
    mockUseMultipleWinners.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data',
    });

    render(<MultipleWinnersComponent />);

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('displays years with multiple winners correctly', () => {
    const data = {
      years: [
        { year: 2020, winnerCount: 3 },
        { year: 2021, winnerCount: 2 },
      ],
    };

    mockUseMultipleWinners.mockReturnValue({
      data,
      loading: false,
      error: null,
    });

    render(<MultipleWinnersComponent />);

    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders empty state correctly when no data is available', () => {
    mockUseMultipleWinners.mockReturnValue({
      data: { years: [] },
      loading: false,
      error: null,
    });

    render(<MultipleWinnersComponent />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});
