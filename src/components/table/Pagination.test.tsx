import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('Pagination Component', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders the correct number of page links', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getAllByRole('link')).toHaveLength(7); // 5 pages + Previous + Next
  });

  it('disables the previous button on the first page', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByRole('link', { name: /previous/i });
    expect(previousButton).toHaveClass('cursor-not-allowed opacity-50');
  });

  it('disables the next button on the last page', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByRole('link', { name: /next/i });
    expect(nextButton).toHaveClass('cursor-not-allowed opacity-50');
  });

  it('calls onPageChange with the correct page when a page link is clicked', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const pageLink = screen.getByRole('link', { name: '2' });
    fireEvent.click(pageLink);

    expect(mockOnPageChange).toHaveBeenCalledWith(1); // Page index starts at 0
  });

  it('navigates to the next page when the next button is clicked', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByRole('link', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('navigates to the previous page when the previous button is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByRole('link', { name: /previous/i });
    fireEvent.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('does not call onPageChange when clicking disabled next or previous buttons', () => {
    render(
      <Pagination
        currentPage={0}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByRole('link', { name: /previous/i });
    fireEvent.click(previousButton);

    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
