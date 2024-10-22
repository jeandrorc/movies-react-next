import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MoviesByYearComponent } from './MoviesByYear.component';
import { useMovieByYear } from '@/hooks';
import '@testing-library/jest-dom';

vi.mock('@/hooks', () => ({
  useMovieByYear: vi.fn(),
}));

describe('MoviesByYearComponent', () => {
  const mockUseMovieByYear = useMovieByYear as jest.Mock;

  beforeEach(() => {
    mockUseMovieByYear.mockClear();
  });

  it('renders the year selector correctly', () => {
    mockUseMovieByYear.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<MoviesByYearComponent />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('List movie winners by year')).toBeInTheDocument();
  });

  it('displays loading state correctly', () => {
    mockUseMovieByYear.mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<MoviesByYearComponent />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state correctly', () => {
    mockUseMovieByYear.mockReturnValue({
      data: [],
      loading: false,
      error: 'Error loading data',
    });

    render(<MoviesByYearComponent />);

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  it('displays movies correctly when data is available', () => {
    const movies = [
      { id: 1, year: 2020, title: 'Movie 1' },
      { id: 2, year: 2021, title: 'Movie 2' },
    ];
    mockUseMovieByYear.mockReturnValue({
      data: movies,
      loading: false,
      error: null,
    });

    render(<MoviesByYearComponent />);

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('updates the selected year when a new year is chosen', () => {
    mockUseMovieByYear.mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    render(<MoviesByYearComponent />);

    fireEvent.click(screen.getByRole('combobox')); // Open the dropdown
    fireEvent.click(screen.getByText('2021')); // Select a year

    expect(screen.getByRole('combobox')).toHaveTextContent('2021');
  });
});
