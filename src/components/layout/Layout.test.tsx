import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import '@testing-library/jest-dom';

vi.mock('@/components/layout/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock('@/components/layout/SideMenu', () => ({
  SideMenu: () => <aside data-testid="sidemenu">SideMenu</aside>,
}));

describe('Layout Component', () => {
  it('renders the header', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>,
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>,
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders the side menu', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>,
    );
    expect(screen.getByTestId('sidemenu')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
