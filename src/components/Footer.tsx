/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PROFILE } from '../data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-brand-border/60 bg-brand-bg py-8 mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left copyright */}
        <div className="text-xs sm:text-sm font-mono text-brand-muted" id="footer-copyright-info">
          <span>© {year} {PROFILE.name} • </span>
          <span className="font-semibold text-brand-primary-bright">{PROFILE.title}</span>
        </div>

        {/* Right social links */}
        <div className="flex items-center space-x-6 text-xs sm:text-sm font-mono tracking-wide" id="footer-social-links">
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-primary-bright transition-colors"
            id="social-link-linkedin"
          >
            LinkedIn
          </a>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-muted hover:text-brand-primary-bright transition-colors"
            id="social-link-github"
          >
            GitHub
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-brand-muted hover:text-brand-primary-bright transition-colors"
            id="social-link-email"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
