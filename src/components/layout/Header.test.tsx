import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import '@testing-library/jest-dom';

vi.mock('@/components/layout/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

describe('Header Component', () => {
  it('renders the header title correctly', () => {
    render(<Header />);
    expect(screen.getByText('MOVIES')).toBeInTheDocument();
  });

  it('renders the container component', () => {
    render(<Header />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  it('has the correct class styles applied', () => {
    render(<Header />);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveClass('text-2xl font-bold');
  });
});
