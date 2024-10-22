import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('renders the copyright text correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Jeandro Couto/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved./i)).toBeInTheDocument();
  });

  it('renders the GitHub link with the correct href', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/jeandrorc');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the LinkedIn link with the correct href', () => {
    render(<Footer />);
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/jeandro',
    );
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies the correct styles', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('text-gray-500 py-6');
  });

  it('renders the container with centered content', () => {
    render(<Footer />);
    const container = screen.getByText(/All rights reserved./i).closest('div');
    expect(container).toHaveClass('container mx-auto text-center');
  });
});
