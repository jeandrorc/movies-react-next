import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { WinByIntervals } from './WinByIntervals.component';
import { useWinIntervals } from '@/hooks';
import '@testing-library/jest-dom';

vi.mock('@/hooks', () => ({
  useWinIntervals: vi.fn(),
}));

describe('WinByIntervals Component', () => {
  const mockUseWinIntervals = useWinIntervals as jest.Mock;

  beforeEach(() => {
    mockUseWinIntervals.mockClear();
  });

  it('renders the header correctly', () => {
    mockUseWinIntervals.mockReturnValue({
      data: { max: [], min: [] },
      loading: false,
      error: null,
    });

    render(<WinByIntervals />);

    expect(
      screen.getByText(
        'Producers with longest and shortest interval between wins',
      ),
    ).toBeInTheDocument();
  });

  it('displays loading state correctly in both sections', () => {
    mockUseWinIntervals.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<WinByIntervals />);

    const maxSection = screen.getByLabelText('Maximum Section');
    const minSection = screen.getByLabelText('Minimum Section');

    expect(within(maxSection).getByText('Loading...')).toBeInTheDocument();
    expect(within(minSection).getByText('Loading...')).toBeInTheDocument();
  });

  it('displays maximum and minimum win intervals correctly', () => {
    const data = {
      max: [
        {
          producer: 'Producer A',
          interval: 10,
          previousWin: 2000,
          followingWin: 2010,
        },
      ],
      min: [
        {
          producer: 'Producer B',
          interval: 1,
          previousWin: 2019,
          followingWin: 2020,
        },
      ],
    };

    mockUseWinIntervals.mockReturnValue({ data, loading: false, error: null });

    render(<WinByIntervals />);

    const maxSection = screen.getByLabelText('Maximum Section');
    const minSection = screen.getByLabelText('Minimum Section');

    expect(within(maxSection).getByText('Producer A')).toBeInTheDocument();
    expect(within(maxSection).getByText('10')).toBeInTheDocument();
    expect(within(maxSection).getByText('2000')).toBeInTheDocument();
    expect(within(maxSection).getByText('2010')).toBeInTheDocument();

    expect(within(minSection).getByText('Producer B')).toBeInTheDocument();
    expect(within(minSection).getByText('1')).toBeInTheDocument();
    expect(within(minSection).getByText('2019')).toBeInTheDocument();
    expect(within(minSection).getByText('2020')).toBeInTheDocument();
  });

  it('renders empty state correctly in both sections', () => {
    mockUseWinIntervals.mockReturnValue({
      data: { max: [], min: [] },
      loading: false,
      error: null,
    });

    render(<WinByIntervals />);

    const maxSection = screen.getByLabelText('Maximum Section');
    const minSection = screen.getByLabelText('Minimum Section');

    expect(within(maxSection).getByText('No data found')).toBeInTheDocument();
    expect(within(minSection).getByText('No data found')).toBeInTheDocument();
  });
});
