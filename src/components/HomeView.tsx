/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Activity } from 'lucide-react';
import { PROFILE, QUICK_STATS } from '../data';
import PipelineFlow from './PipelineFlow';

export default function HomeView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 dot-grid min-h-screen" id="home-screen">
      {/* Availability badge */}
      <div className="flex justify-center md:justify-start" id="home-hero-badge">
        <div className="inline-flex items-center space-x-2 rounded-full border border-brand-primary-bright/20 bg-brand-primary-dark/10 px-3 py-1 font-mono text-[10px] tracking-widest text-brand-primary-bright uppercase mb-6">
          <Activity className="h-3 w-3 animate-signal text-brand-primary-bright" />
          <span>{PROFILE.availability}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="home-hero-layout">
        {/* Left copy section */}
        <div className="lg:col-span-7 space-y-6 text-center md:text-left" id="home-hero-content">
          <p className="font-mono text-xs sm:text-sm tracking-wider text-brand-primary-bright font-semibold uppercase">
            {PROFILE.name} // {PROFILE.title}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
            Turning unreliable pipelines into{' '}
            <span className="text-brand-primary-bright">governed platforms</span> teams trust.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-2xl leading-relaxed">
            {PROFILE.summary}
          </p>

          {/* Quick Stats Grid (verified figures only) */}
          <div className="grid grid-cols-3 gap-4 py-6" id="home-quick-stats">
            {QUICK_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-brand-border bg-brand-card/30 p-4 text-center"
              >
                <span className="block font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono uppercase text-brand-muted tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
            <button
              onClick={() => onNavigate('experience')}
              className="rounded border border-brand-primary py-2 px-6 font-mono text-xs md:text-sm font-semibold text-brand-on-primary bg-brand-primary hover:bg-brand-primary-bright transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              id="cta-explore-pipelines"
            >
              <span>Explore Experience</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="rounded border border-brand-border py-2 px-6 font-mono text-xs md:text-sm font-semibold text-white bg-transparent hover:bg-brand-card/65 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
              id="cta-view-projects"
            >
              <span>View Data Projects</span>
            </button>
          </div>
        </div>

        {/* Right: animated, factual data-flow visual */}
        <div className="lg:col-span-5" id="home-hero-visual">
          <PipelineFlow />
        </div>
      </div>
    </div>
  );
}
