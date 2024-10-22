'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { Button } from '@/components/ui';
import { useClickOutside } from '@/hooks/useClickOutside';

type MenuItem = {
  name: string;
  link: string;
  testId: string;
};

const menuItems: MenuItem[] = [
  { name: 'Home', link: '/', testId: 'home-menu' },
  { name: 'Movies', link: '/movies', testId: 'movies-menu' },
];

export function SideMenu() {
  const pathname = usePathname();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  // Usando o hook personalizado
  useClickOutside(drawerRef, () => isDrawerOpen && closeDrawer());

  const renderMenuItems = (isMobile: boolean) =>
    menuItems.map((item) => (
      <li key={item.name} data-testid={`menu-item-${item.testId}`}>
        <Link href={item.link} onClick={isMobile ? closeDrawer : undefined}>
          <span
            className={`block p-3 rounded-md border border-gray-700 hover:bg-gray-700 hover:text-amber-400 ${
              pathname === item.link
                ? 'bg-gray-800 text-amber-400'
                : 'bg-gray-100'
            }`}
          >
            {item.name}
          </span>
        </Link>
      </li>
    ));

  return (
    <>
      <Button
        size="icon"
        data-testid="menu-toggle"
        className="lg:hidden p-3 text-amber-400 m-2"
        onClick={toggleDrawer}
      >
        {isDrawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </Button>

      {isDrawerOpen && (
        <div
          data-testid="drawer-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 lg:hidden"
        >
          <aside
            ref={drawerRef}
            data-testid="drawer"
            className="w-64 bg-gray-900 p-4 h-full"
          >
            <ul className="space-y-2">{renderMenuItems(true)}</ul>
          </aside>
        </div>
      )}

      <aside className="hidden lg:block w-64 p-4">
        <ul className="space-y-2">{renderMenuItems(false)}</ul>
      </aside>
    </>
  );
}
