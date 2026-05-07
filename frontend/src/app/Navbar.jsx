'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { IconNotes, IconMenu2, IconX, IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from 'next-themes'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-[#0b0c10]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-teal-500 text-white dark:text-[#0b0c10] p-1.5 rounded-xl flex items-center justify-center">
              <IconNotes size={20} stroke={2} />
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">MeetBrief</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </button>
            )}

            <SignedOut>
              <Link href="/login" className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Log in</Link>
              <Link href="/signup" className="text-sm font-semibold text-white dark:text-black bg-slate-900 dark:bg-white rounded-xl px-4 py-2 flex items-center justify-center hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm">
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 mr-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none">
              {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 absolute w-full left-0 top-16 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            <Link href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5">Features</Link>
            <Link href="#how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5">How it Works</Link>
            <Link href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5">Pricing</Link>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col space-y-2">
              <Link href="/login" className="block w-full text-center px-4 py-2 font-medium text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 rounded-lg hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">Log in</Link>
              <Link href="/signup" className="block w-full text-center px-4 py-2 font-medium text-white dark:text-black bg-slate-900 dark:bg-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;