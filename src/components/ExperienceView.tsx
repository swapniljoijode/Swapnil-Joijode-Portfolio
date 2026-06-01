/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Terminal,
  Calendar,
  MapPin,
  Database,
  CheckCircle2,
  ArrowRightLeft,
} from 'lucide-react';
import { WORK_HISTORY, SKILL_CATEGORIES, PROFILE } from '../data';
import Icon from './Icon';

export default function ExperienceView() {
  const [activeCodeTab, setActiveCodeTab] = useState<'python' | 'sql'>('python');

  // Highlight verified figures and key tools inside a bullet.
  const formatHighlight = (text: string) => {
    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const keywords: { key: string; class: string }[] = [
      { key: '~70 to under 15', class: 'text-brand-primary-bright font-mono font-medium' },
      { key: '90 to 55 minutes', class: 'text-brand-primary-bright font-mono font-medium' },
      { key: '6–7 hours to 2–3 hours', class: 'text-brand-primary-bright font-mono font-medium' },
      { key: '10 GB to 1 GB', class: 'text-brand-primary-bright font-mono font-medium' },
      { key: '10 to 2 minutes', class: 'text-brand-primary-bright font-mono font-medium' },
      { key: '0.58% to 0.18%', class: 'text-rose-400 font-mono font-medium' },
      { key: '50+ governed business metrics', class: 'text-slate-200 font-medium' },
      { key: '50+ KPI definitions', class: 'text-slate-200 font-medium' },
      { key: 'GitLab CI/CD', class: 'text-teal-400 font-mono' },
      { key: 'Power BI', class: 'text-yellow-400' },
      { key: 'Databricks', class: 'text-teal-400' },
      { key: 'Snowflake', class: 'text-teal-400' },
      { key: 'Airflow', class: 'text-teal-400' },
      { key: 'dbt', class: 'text-brand-primary-bright font-medium' },
    ];

    // Longest keys first so multi-word phrases win over their substrings.
    const sorted = keywords.slice().sort((a, b) => b.key.length - a.key.length);
    const classByKey = new Map(sorted.map((k) => [k.key, k.class]));
    const pattern = new RegExp(`(${sorted.map((k) => escape(k.key)).join('|')})`, 'g');

    // String.split with a capturing group keeps the matches in the result.
    const pieces = text.split(pattern);
    return (
      <span>
        {pieces.map((piece, idx) => {
          const cls = classByKey.get(piece);
          return cls ? (
            <span key={idx} className={cls}>
              {piece}
            </span>
          ) : (
            <React.Fragment key={idx}>{piece}</React.Fragment>
          );
        })}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 dot-grid min-h-screen" id="experience-screen">
      {/* breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-brand-muted uppercase mb-4" id="experience-header-breadcrumb">
        <Terminal className="h-4.5 w-4.5 text-brand-primary-bright" />
        <span>PROFESSIONAL TRACE</span>
        <span className="text-brand-primary">/</span>
        <span className="text-brand-text">EXPERIENCE</span>
      </div>

      {/* Main Hero heading */}
      <div className="mb-12 max-w-4xl" id="experience-hero-text">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Engineering Scalable Data <span className="text-brand-primary-bright block sm:inline">Pipelines</span> &amp; Platforms.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-3xl leading-relaxed">
          3+ years building and hardening data systems across logistics, retail, and financial services — focused on reliability, governance, and clean, maintainable engineering.
        </p>
      </div>

      {/* Work History on left, Skills Matrix on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" id="experience-content-split">
        {/* Left column: Work History */}
        <div className="lg:col-span-7 space-y-8" id="work-history-column">
          <div className="flex items-center justify-between border-b border-brand-border pb-3 mb-6">
            <h2 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-brand-primary-bright uppercase">
              // WORK HISTORY
            </h2>
            <span className="font-mono text-[10px] text-brand-muted uppercase">{WORK_HISTORY.length} roles</span>
          </div>

          <div className="relative border-l border-brand-border/40 pl-6 ml-3 space-y-12">
            {WORK_HISTORY.map((job, idx) => (
              <div key={job.id} className="relative group" id={`timeline-item-${job.id}`}>
                {/* Bullet Node */}
                <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-bg">
                  {idx === 0 ? (
                    <span className="h-2 w-2 rounded-full bg-brand-primary-bright ring-4 ring-brand-primary/25 animate-pulse" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-muted/40 group-hover:bg-brand-primary-bright transition-colors" />
                  )}
                </span>

                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-primary-bright transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm font-semibold text-teal-400 font-mono">{job.company}</p>
                    <p className="flex items-center text-[11px] font-mono text-brand-muted mt-0.5">
                      <MapPin className="h-3 w-3 mr-1" />
                      {job.location}
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-mono text-brand-muted space-x-1.5 mt-1 sm:mt-0 bg-brand-card/60 px-2 py-1 rounded border border-brand-border/40 whitespace-nowrap">
                    <Calendar className="h-3.5 w-3.5 text-brand-primary" />
                    <span>{job.period}</span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-4 text-brand-text/80 text-sm leading-relaxed list-none pl-0">
                  {job.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brand-primary font-mono mr-2.5 select-none">&gt;</span>
                      <span className="flex-1 text-slate-300">{formatHighlight(highlight)}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-brand-card hover:bg-brand-border/40 border border-brand-border px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-slate-300 font-semibold transition-colors uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Skills Matrix */}
        <div className="lg:col-span-5 space-y-6" id="skills-matrix-column">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <h2 className="font-mono text-xs sm:text-sm font-bold tracking-widest text-brand-primary-bright uppercase">
              // SKILLS MATRIX
            </h2>
            <span className="font-mono text-[10px] text-brand-muted uppercase">{SKILL_CATEGORIES.length} domains</span>
          </div>

          <div className="grid grid-cols-1 gap-4" id="skills-matrix-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="rounded-lg border border-brand-border bg-brand-card/60 p-4.5 hover:border-brand-primary/45 transition-all group"
                id={`skill-card-${cat.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-brand-primary-bright uppercase">
                    {cat.categoryName}
                  </span>
                  <Icon
                    name={cat.iconName}
                    className="h-4 w-4 text-brand-muted/70 group-hover:text-brand-primary transition-colors"
                  />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[11px] text-slate-300">
                  {cat.skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-1 hover:text-white transition-colors">
                      <span className="text-brand-primary/70">&lt;</span>
                      <span className="truncate">{skill}</span>
                      <span className="text-brand-primary/70">/&gt;</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Availability badge (factual) */}
          <div className="rounded border border-brand-border bg-brand-bg p-3 flex items-center justify-between px-4 font-mono text-xs" id="availability-badge">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-brand-primary-bright animate-signal" />
              <span className="text-[10px] uppercase font-bold text-slate-300">OPEN TO ROLES</span>
            </div>
            <div className="text-[10px] text-brand-muted">
              <span className="text-brand-primary-bright font-bold">{PROFILE.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: How I build (representative code, no simulated telemetry) */}
      <section className="mt-16 pt-10 border-t border-brand-border" id="architecture-blueprint-panel">
        <div className="mb-8" id="blueprint-intro">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2 font-mono uppercase">
            // How I Build
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted max-w-2xl">
            I treat data like production software: modular pipelines, automated tests and source-freshness checks, and versioned logic shipped through CI/CD. The snippets below are representative of how I structure transformations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="blueprint-interactive-container">
          {/* Left panel: representative code */}
          <div className="lg:col-span-7 rounded-lg border border-brand-border bg-brand-bg/95 flex flex-col overflow-hidden" id="blueprint-ide-panel">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-brand-border bg-brand-card/85 px-4 py-2.5">
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-[10px] sm:text-xs text-brand-muted">
                  {activeCodeTab === 'python' ? 'deploy_workflow.py' : 'stg_logistics.sql'}
                </span>
              </div>
              <div className="flex space-x-1.5">
                <button
                  onClick={() => setActiveCodeTab('python')}
                  className={`px-2 py-0.5 font-mono text-[10px] rounded transition-all ${
                    activeCodeTab === 'python'
                      ? 'bg-brand-primary/15 text-brand-primary-bright border border-brand-primary/30'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  Python
                </button>
                <button
                  onClick={() => setActiveCodeTab('sql')}
                  className={`px-2 py-0.5 font-mono text-[10px] rounded transition-all ${
                    activeCodeTab === 'sql'
                      ? 'bg-brand-primary/15 text-brand-primary-bright border border-brand-primary/30'
                      : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  dbt SQL
                </button>
              </div>
            </div>

            {/* Code viewport */}
            <div className="p-4 sm:p-5 font-mono text-xs overflow-x-auto min-h-[220px] bg-brand-card/25" id="ide-viewport">
              {activeCodeTab === 'python' ? (
                <div className="space-y-1">
                  <p><span className="text-teal-400">from</span> airflow.decorators <span className="text-teal-400">import</span> dag, task</p>
                  <p className="text-emerald-400"># Airflow-orchestrated ELT into Snowflake</p>
                  <p><span className="text-teal-400">@dag</span>(schedule=<span className="text-amber-300">&apos;@hourly&apos;</span>, catchup=<span className="text-amber-300">False</span>)</p>
                  <p><span className="text-teal-400">def</span> <span className="text-yellow-400">logistics_elt</span>():</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">@task</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-teal-400">def</span> <span className="text-yellow-400">load_and_test</span>():</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;spark.read_s3(<span className="text-amber-300">&apos;raw/logistics&apos;</span>).write_snowflake()</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dbt.run(); dbt.test()  <span className="text-emerald-400"># schema + freshness</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;load_and_test()</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p><span className="text-emerald-500">{'{{'}</span> config(materialized=<span className="text-amber-300">&apos;incremental&apos;</span>, unique_key=<span className="text-amber-300">&apos;log_id&apos;</span>) <span className="text-emerald-500">{'}}'}</span></p>
                  <p>&nbsp;</p>
                  <p><span className="text-teal-400">SELECT</span></p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;log_id,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;origin_hub,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;parcel_weight_kg,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;_ingested_at</p>
                  <p><span className="text-teal-400">FROM</span> <span className="text-emerald-300">{"{{ source('raw', 'logistics') }}"}</span></p>
                  <p><span className="text-teal-400">WHERE</span> _ingested_at &gt;= (<span className="text-teal-400">SELECT</span> MAX(_ingested_at) <span className="text-teal-400">FROM</span> <span className="text-emerald-400">{"{{ this }}"}</span>)</p>
                </div>
              )}
            </div>
          </div>

          {/* Right panel: approach highlights (factual) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4" id="blueprint-highlights-stack">
            <div className="rounded-lg border border-brand-border bg-brand-card/45 p-4.5 hover:border-brand-primary/40 transition-colors flex items-start space-x-4">
              <div className="p-2 rounded border border-brand-border/60 bg-brand-bg text-brand-primary flex items-center justify-center shrink-0">
                <Database className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-100 font-mono tracking-tight">Dimensional Modeling</h4>
                <p className="text-xs text-brand-muted">Kimball-style star schemas, data marts, and governed semantic layers on Snowflake and Databricks.</p>
              </div>
            </div>

            <div className="rounded-lg border border-brand-border bg-brand-card/45 p-4.5 hover:border-brand-primary/40 transition-colors flex items-start space-x-4">
              <div className="p-2 rounded border border-brand-border/60 bg-brand-bg text-brand-primary-bright flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-100 font-mono tracking-tight">Data Quality Built In</h4>
                <p className="text-xs text-brand-muted">Automated dbt tests, schema validation, and source-freshness monitoring on every run.</p>
              </div>
            </div>

            <div className="rounded-lg border border-brand-border bg-brand-card/45 p-4.5 hover:border-brand-primary/40 transition-colors flex items-start space-x-4">
              <div className="p-2 rounded border border-brand-border/60 bg-brand-bg text-teal-400 flex items-center justify-center shrink-0">
                <ArrowRightLeft className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-100 font-mono tracking-tight">CI/CD Driven</h4>
                <p className="text-xs text-brand-muted">Versioned, tested deployments through GitLab CI/CD and GitHub Actions with rollback support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
