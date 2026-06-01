/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Terminal, Code, Copy, Check } from 'lucide-react';
import { PROJECTS } from '../data';

export default function ProjectsView() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const currentProject = PROJECTS.find((p) => p.id === activeProject) || PROJECTS[0];

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 dot-grid min-h-screen" id="projects-screen">
      {/* breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-brand-muted uppercase mb-4" id="projects-header-breadcrumb">
        <Terminal className="h-4.5 w-4.5 text-brand-primary-bright" />
        <span>PROJECTS</span>
        <span className="text-brand-primary">/</span>
        <span className="text-brand-text">CASE STUDIES</span>
      </div>

      {/* Hero Header */}
      <div className="mb-12 max-w-4xl" id="projects-hero-text">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Production-Pattern <span className="text-brand-primary-bright">Data Projects</span> &amp; Pipelines.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-3xl leading-relaxed">
          End-to-end pipelines, governed dimensional models, and ML serving — drawn from professional work and self-directed case studies.
        </p>
      </div>

      {/* Grid Layout: Left sidebar selector, Right detail card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" id="projects-grid-container">
        {/* Left Side: Sidebar selector */}
        <div className="lg:col-span-4 space-y-4" id="projects-sidebar">
          <p className="font-mono text-xs font-bold tracking-widest text-brand-primary-bright uppercase mb-2">
            // SELECT PROJECT
          </p>
          <div className="space-y-3">
            {PROJECTS.map((proj) => {
              const isSelected = proj.id === activeProject;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveProject(proj.id);
                    setCopiedCode(false);
                  }}
                  className={`w-full text-left rounded-lg border p-4.5 transition-all outline-none focus:outline-none cursor-pointer ${
                    isSelected
                      ? 'border-brand-primary bg-brand-primary-dark/15 text-white shadow-[0_2px_12px_rgba(78,222,163,0.1)]'
                      : 'border-brand-border bg-brand-card/40 text-brand-text/75 hover:border-brand-primary/40 hover:bg-brand-card/75'
                  }`}
                  id={`project-sidemenu-item-${proj.id}`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-primary-bright font-bold">
                      {proj.architectureBadge}
                    </span>
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-brand-primary-bright animate-pulse" />}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base tracking-tight mb-2">{proj.name}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] font-mono bg-brand-bg px-2 py-0.5 rounded border border-brand-border/40 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed card */}
        <div className="lg:col-span-8 space-y-6" id="projects-details-panel">
          <div className="rounded-lg border border-brand-border bg-brand-card/90 p-5 sm:p-7 space-y-6 relative overflow-hidden" id="project-detail-card">
            {/* Top glass glow strip */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-border pb-4 gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-widest text-brand-primary-bright font-bold uppercase">
                  {currentProject.architectureBadge}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{currentProject.name}</h2>
              </div>
              <div className="flex space-x-2">
                <span className="rounded-full bg-brand-primary/10 border border-brand-primary/30 px-3 py-1 font-mono text-[10px] font-bold text-brand-primary-bright uppercase">
                  {currentProject.context}
                </span>
              </div>
            </div>

            {/* In-depth description */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold text-brand-primary">// OVERVIEW</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{currentProject.description}</p>
            </div>

            {/* Performance KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="project-kpis">
              {currentProject.stats.map((st, index) => (
                <div key={index} className="rounded border border-brand-border bg-brand-bg/60 p-4 font-mono text-center">
                  <span className="block text-xs uppercase text-brand-muted tracking-wider mb-1">{st.label}</span>
                  <span className="text-base sm:text-lg font-bold text-brand-primary-bright">{st.value}</span>
                </div>
              ))}
            </div>

            {/* Tech chips block */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold text-brand-primary">// Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.tech.map((t) => (
                  <span key={t} className="rounded bg-brand-bg px-3 py-1 font-mono text-xs border border-brand-border text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Embedded code snippet */}
            {currentProject.pipelineCode && (
              <div className="rounded border border-brand-border bg-brand-bg/95 overflow-hidden flex flex-col pt-1" id="project-embedded-code">
                <div className="flex justify-between items-center bg-brand-card/85 px-4 py-2 border-b border-brand-border">
                  <span className="font-mono text-xs text-brand-muted flex items-center space-x-1.5">
                    <Code className="h-3.5 w-3.5" />
                    <span>{currentProject.codeLabel || 'snippet'}</span>
                  </span>
                  <button
                    onClick={() => handleCopyCode(currentProject.pipelineCode || '')}
                    className="text-brand-muted hover:text-white transition-colors p-1"
                    title="Copy code to clipboard"
                    id="copy-code-snippet-btn"
                  >
                    {copiedCode ? <Check className="h-4 w-4 text-brand-primary-bright" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs overflow-x-auto text-zinc-300 leading-relaxed max-h-[260px]">
                  <code>{currentProject.pipelineCode}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
