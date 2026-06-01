/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenResume: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenResume }: HeaderProps) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-border bg-brand-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo / Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex cursor-pointer items-center space-x-2 text-lg font-bold tracking-wider text-brand-primary-bright font-mono transition-opacity hover:opacity-90"
          id="brand-logo"
        >
          <span>SWAPNIL.LOG</span>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center space-x-1 sm:space-x-4 md:space-x-8" id="header-navigation">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-1 py-2 font-mono text-xs sm:text-sm font-medium tracking-wide transition-colors duration-150 focus:outline-none ${
                  isActive
                    ? 'text-brand-primary-bright'
                    : 'text-brand-text/60 hover:text-brand-text'
                }`}
                id={`nav-item-${tab.id}`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-brand-primary-bright shadow-[0_1px_6px_rgba(78,222,163,0.4)]"
                    style={{ content: '""' }}
                  />
                )}
              </button>
            );
          })}

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="rounded border border-brand-primary py-1.5 px-3 md:px-4 font-mono text-xs md:text-sm font-semibold text-brand-on-primary bg-brand-primary hover:bg-brand-primary-bright transition-all active:scale-[0.98] cursor-pointer"
            id="nav-resume-btn"
          >
            Resume
          </button>
        </nav>
      </div>
    </header>
  );
}
