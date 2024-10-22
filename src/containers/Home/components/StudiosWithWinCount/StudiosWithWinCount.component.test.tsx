import React from 'react';
import { render, screen } from '@testing-library/react';
import { StudiosWithWinCountComponent } from './StudiosWithWinCount.component';
import { useStudiosWithWinCount } from '@/hooks';
import '@testing-library/jest-dom';

vi.mock('@/hooks', () => ({
  useStudiosWithWinCount: vi.fn(),
}));

describe('StudiosWithWinCountComponent', () => {
  const mockUseStudiosWithWinCount = useStudiosWithWinCount as jest.Mock;

  beforeEach(() => {
    mockUseStudiosWithWinCount.mockClear();
  });

  it('renders the header correctly', () => {
    mockUseStudiosWithWinCount.mockReturnValue({
      data: { studios: [] },
      loading: false,
      error: null,
    });

    render(<StudiosWithWinCountComponent />);

    expect(screen.getByText('Top 3 studios with winners')).toBeInTheDocument();
  });

  it('displays loading state correctly', () => {
    mockUseStudiosWithWinCount.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<StudiosWithWinCountComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state correctly', () => {
    mockUseStudiosWithWinCount.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data',
    });

    render(<StudiosWithWinCountComponent />);

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  it('displays studios with win counts correctly', () => {
    const data = {
      studios: [
        { name: 'Studio A', winCount: 10 },
        { name: 'Studio B', winCount: 8 },
        { name: 'Studio C', winCount: 5 },
      ],
    };

    mockUseStudiosWithWinCount.mockReturnValue({
      data,
      loading: false,
      error: null,
    });

    render(<StudiosWithWinCountComponent />);

    expect(screen.getByText('Studio A')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Studio B')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('Studio C')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders empty state correctly when no data is available', () => {
    mockUseStudiosWithWinCount.mockReturnValue({
      data: { studios: [] },
      loading: false,
      error: null,
    });

    render(<StudiosWithWinCountComponent />);

    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});
