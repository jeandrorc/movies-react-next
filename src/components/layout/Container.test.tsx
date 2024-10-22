import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';
import '@testing-library/jest-dom';

describe('Container Component', () => {
  it('renders children content correctly', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default classes correctly', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>,
    );
    const container = screen.getByRole('presentation', { hidden: true });
    expect(container).toHaveClass(
      'max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 w-full',
    );
  });

  it('applies additional classes when provided', () => {
    render(
      <Container className="bg-gray-100">
        <div>Test Content</div>
      </Container>,
    );
    const container = screen.getByRole('presentation', { hidden: true });
    expect(container).toHaveClass('bg-gray-100');
  });

  it('merges additional classes with default ones', () => {
    render(
      <Container className="bg-gray-100">
        <div>Test Content</div>
      </Container>,
    );
    const container = screen.getByRole('presentation', { hidden: true });
    expect(container).toHaveClass(
      'max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 w-full bg-gray-100',
    );
  });
});
