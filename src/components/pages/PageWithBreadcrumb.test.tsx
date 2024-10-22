import React from 'react';
import { render, screen } from '@testing-library/react';
import { PageWithBreadcrumb } from './PageWithBreadcrumb';
import '@testing-library/jest-dom';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

describe('PageWithBreadcrumb Component', () => {
  it('renders the home breadcrumb correctly', () => {
    render(
      <MemoryRouterProvider>
        <PageWithBreadcrumb>
          <div>Test Content</div>
        </PageWithBreadcrumb>
      </MemoryRouterProvider>,
    );

    const homeBreadcrumb = screen.getByText('Home');
    expect(homeBreadcrumb).toBeInTheDocument();
    expect(homeBreadcrumb).toHaveAttribute('href', '/');
  });

  it('renders additional pages correctly', () => {
    const pages = [
      { name: 'Movies', url: '/movies' },
      { name: 'Action', url: '/movies/action' },
    ];

    render(
      <MemoryRouterProvider>
        <PageWithBreadcrumb pages={pages}>
          <div>Test Content</div>
        </PageWithBreadcrumb>
      </MemoryRouterProvider>,
    );

    expect(screen.getByText('Movies')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders links with the correct href', () => {
    const pages = [{ name: 'Movies', url: '/movies' }];

    render(
      <MemoryRouterProvider>
        <PageWithBreadcrumb pages={pages}>
          <div>Test Content</div>
        </PageWithBreadcrumb>
      </MemoryRouterProvider>,
    );

    const moviesLink = screen.getByText('Movies');
    expect(moviesLink).toHaveAttribute('href', '/movies');
  });

  it('renders children content correctly', () => {
    render(
      <MemoryRouterProvider>
        <PageWithBreadcrumb>
          <div>Test Content</div>
        </PageWithBreadcrumb>
      </MemoryRouterProvider>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders the ">" separator between pages', () => {
    const pages = [{ name: 'Movies', url: '/movies' }];

    render(
      <MemoryRouterProvider>
        <PageWithBreadcrumb pages={pages}>
          <div>Test Content</div>
        </PageWithBreadcrumb>
      </MemoryRouterProvider>,
    );

    expect(screen.getByTestId('separator-0')).toBeInTheDocument();
  });

  it('renders the last breadcrumb as text without a link', () => {
    const pages = [{ name: 'Movies', url: '' }];

    render(
      <MemoryRouterProvider>
        <PageWithBreadcrumb pages={pages}>
          <div>Test Content</div>
        </PageWithBreadcrumb>
      </MemoryRouterProvider>,
    );

    const lastBreadcrumb = screen.getByText('Movies');
    expect(lastBreadcrumb).not.toHaveAttribute('href');
    expect(lastBreadcrumb).toHaveClass('font-black');
  });
});
