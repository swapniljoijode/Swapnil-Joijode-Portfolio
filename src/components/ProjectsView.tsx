/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Terminal, Code, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { PROJECTS } from '../data';

const GithubIcon = () => (
  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
      -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
      .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
      -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.58c.68 0
      1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
      1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
      1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

// ── Sync helpers ────────────────────────────────────────────────────────────

const STORAGE_KEY = 'portfolio_synced_projects';

interface SyncedData {
  description: string;
  syncedAt: string;
}

function loadSynced(): Record<string, SyncedData> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveSynced(data: Record<string, SyncedData>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function githubRawUrl(repoUrl: string): string {
  // https://github.com/USER/REPO → raw README
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return '';
  return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/main/README.md`;
}

function parseReadme(raw: string): string {
  const lines = raw.split('\n');
  const sections: { heading: string; body: string[] }[] = [];
  let current: { heading: string; body: string[] } | null = null;

  for (const line of lines) {
    const h = line.match(/^#{1,3}\s+(.+)/);
    if (h) {
      if (current) sections.push(current);
      current = { heading: h[1].trim(), body: [] };
    } else if (current && line.trim()) {
      current.body.push(line.trim());
    }
  }
  if (current) sections.push(current);

  // Map heading keywords → BAR labels
  const BACKGROUND_KEYS = ['background', 'context', 'overview', 'about', 'summary', 'executive'];
  const ACTIONS_KEYS = ['action', 'what was built', 'built', 'implementation', 'how', 'architecture', 'approach'];
  const RESULTS_KEYS = ['result', 'outcome', 'metric', 'performance', 'achievement', 'impact'];

  const pick = (keys: string[]) =>
    sections.find((s) => keys.some((k) => s.heading.toLowerCase().includes(k)));

  const bg = pick(BACKGROUND_KEYS);
  const ac = pick(ACTIONS_KEYS);
  const rs = pick(RESULTS_KEYS);

  const format = (label: string, sec: typeof bg) => {
    if (!sec) return '';
    const body = sec.body
      .filter((l) => !l.startsWith('#') && !l.startsWith('|') && l.length > 20)
      .slice(0, 3)
      .join(' ')
      .replace(/[*_`]/g, '')
      .slice(0, 260);
    return body ? `${label}: ${body}` : '';
  };

  const parts = [format('Background', bg), format('Actions', ac), format('Results', rs)].filter(Boolean);

  if (parts.length) return parts.join('\n\n');

  // Fallback: first meaningful paragraph
  const fallback = lines
    .filter((l) => l.trim().length > 40 && !l.startsWith('#') && !l.startsWith('|'))
    .slice(0, 4)
    .join(' ')
    .replace(/[*_`]/g, '')
    .slice(0, 400);
  return fallback || 'No description found in README.';
}

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ── Component ───────────────────────────────────────────────────────────────

export default function ProjectsView() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [synced, setSynced] = useState<Record<string, SyncedData>>(loadSynced);
  const [syncState, setSyncState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const currentProject = PROJECTS.find((p) => p.id === activeProject) || PROJECTS[0];
  const syncedEntry = synced[currentProject.id];
  const displayDescription = syncedEntry?.description || currentProject.description;

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSync = useCallback(async () => {
    const projectsWithGithub = PROJECTS.filter((p) => p.githubUrl);
    if (!projectsWithGithub.length) return;

    setSyncState('loading');
    try {
      const results: Record<string, SyncedData> = { ...synced };
      await Promise.all(
        projectsWithGithub.map(async (proj) => {
          const url = githubRawUrl(proj.githubUrl!);
          if (!url) return;
          const res = await fetch(url);
          if (!res.ok) return;
          const raw = await res.text();
          const description = parseReadme(raw);
          if (description) {
            results[proj.id] = { description, syncedAt: new Date().toISOString() };
          }
        })
      );
      saveSynced(results);
      setSynced(results);
      setSyncState('done');
      setTimeout(() => setSyncState('idle'), 3000);
    } catch {
      setSyncState('error');
      setTimeout(() => setSyncState('idle'), 3000);
    }
  }, [synced]);

  const syncLabel =
    syncState === 'loading' ? 'Syncing…' :
    syncState === 'done'    ? 'Synced ✓' :
    syncState === 'error'   ? 'Failed' :
    'Sync with GitHub';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 dot-grid min-h-screen" id="projects-screen">
      {/* breadcrumb */}
      <div className="flex items-center justify-between mb-4" id="projects-header-breadcrumb">
        <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-brand-muted uppercase">
          <Terminal className="h-4.5 w-4.5 text-brand-primary-bright" />
          <span>PROJECTS</span>
          <span className="text-brand-primary">/</span>
          <span className="text-brand-text">CASE STUDIES</span>
        </div>
        <button
          onClick={handleSync}
          disabled={syncState === 'loading'}
          className={`flex items-center space-x-1.5 rounded border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
            syncState === 'loading'
              ? 'border-brand-primary/40 text-brand-primary cursor-wait'
              : syncState === 'done'
              ? 'border-emerald-500/40 text-emerald-400'
              : syncState === 'error'
              ? 'border-red-500/40 text-red-400'
              : 'border-brand-border text-brand-muted hover:border-brand-primary/50 hover:text-brand-primary-bright cursor-pointer'
          }`}
          title="Fetch latest READMEs from GitHub and refresh project descriptions"
          id="sync-github-btn"
        >
          <RefreshCw className={`h-3 w-3 ${syncState === 'loading' ? 'animate-spin' : ''}`} />
          <span>{syncLabel}</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="mb-12 max-w-4xl" id="projects-hero-text">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Production-Pattern <span className="text-brand-primary-bright">Data Projects</span> &amp; Pipelines.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-3xl leading-relaxed">
          End-to-end pipelines, governed dimensional models, and full-stack engineering — self-directed case studies targeting Data Engineer and Analytics Engineer roles.
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
              const hasSynced = !!synced[proj.id];
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
                    <div className="flex items-center space-x-1.5">
                      {hasSynced && (
                        <span className="font-mono text-[8px] text-emerald-400/70 uppercase tracking-wider">synced</span>
                      )}
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-brand-primary-bright animate-pulse" />}
                    </div>
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
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between border-b border-brand-border pb-4 gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] tracking-widest text-brand-primary-bright font-bold uppercase">
                  {currentProject.architectureBadge}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{currentProject.name}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-primary/10 border border-brand-primary/30 px-3 py-1 font-mono text-[10px] font-bold text-brand-primary-bright uppercase">
                  {currentProject.context}
                </span>
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 rounded-full bg-brand-card border border-brand-border px-3 py-1 font-mono text-[10px] text-brand-muted hover:text-white hover:border-brand-primary/60 transition-colors"
                    title="View on GitHub"
                  >
                    <GithubIcon />
                    <span>GitHub</span>
                  </a>
                )}
                {currentProject.websiteUrl && (
                  <a
                    href={currentProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/40 px-3 py-1 font-mono text-[10px] text-brand-primary-bright hover:bg-brand-primary/20 transition-colors"
                    title="View live demo"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Description — synced content shown with indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-mono text-xs font-bold text-brand-primary">// OVERVIEW</h4>
                {syncedEntry && (
                  <span className="font-mono text-[9px] text-emerald-400/70 uppercase tracking-wider">
                    synced {timeAgo(syncedEntry.syncedAt)}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{displayDescription}</p>
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
