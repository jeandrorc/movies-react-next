"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui";

type MenuItem = {
    name: string;
    link: string;
};

const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/movies" },
];

export function SideMenu() {
    const pathname = usePathname();
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const drawerRef = useRef<HTMLDivElement>(null);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };


    const handleClickOutside = (event: MouseEvent) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
            setDrawerOpen(false);
        }
    };

    useEffect(() => {
        if (isDrawerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDrawerOpen]);

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
            <div
                data-testid="drawer-overlay"
                className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transform transition-transform ${
                    isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                } lg:hidden`}
            >
                <aside
                    ref={drawerRef}
                    data-testid="drawer"
                    className="w-64 bg-gray-900 p-4 h-full"
                >
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.link}
                                    className={`block p-3 rounded-md border-gray-700 border hover:bg-gray-700 hover:text-amber-400 ${
                                        pathname === item.link
                                            ? "bg-gray-800 text-amber-400"
                                            : "bg-gray-100"
                                    }`}
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>

            <aside className="hidden lg:block w-64 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.link}
                                className={`block p-3 rounded-md border-gray-700 border hover:bg-gray-700 hover:text-amber-400 ${
                                    pathname === item.link
                                        ? "bg-gray-800 text-amber-400"
                                        : "bg-gray-100"
                                }`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}
