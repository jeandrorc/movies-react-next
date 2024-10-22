import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataState } from './DataState';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('DataState Component', () => {
  const mockRender = vi.fn((data) =>
    data.map((item) => <div key={item.id}>{item.name}</div>),
  );

  it('renders loading state', () => {
    render(<DataState loading={true} render={mockRender} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    render(
      <DataState
        loading={false}
        error="Something went wrong"
        render={mockRender}
      />,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders no data message when data is empty', () => {
    render(<DataState data={[]} loading={false} render={mockRender} />);
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders data correctly', () => {
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];

    render(<DataState data={mockData} loading={false} render={mockRender} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
