/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { X, Download, Terminal, Mail, MapPin, Award, BookOpen, ExternalLink } from 'lucide-react';
import { PROFILE, WORK_HISTORY, EDUCATION, CERTIFICATIONS, CORE_TECH, PROJECTS } from '../data';

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

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      id="resume-viewer-modal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-brand-bg border border-brand-primary rounded-lg overflow-hidden shadow-[0_4px_30px_rgba(78,222,163,0.15)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Shiny top light border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-brand-border bg-brand-card/90 px-5 py-3">
          <div className="flex items-center space-x-2 font-mono text-xs text-brand-primary-bright">
            <Terminal className="h-4.5 w-4.5" />
            <span>RÉSUMÉ — {PROFILE.name.toUpperCase()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href={PROFILE.resumeFile}
              download
              className="p-1.5 rounded hover:bg-brand-border/60 text-brand-muted hover:text-white transition-colors cursor-pointer flex items-center space-x-1 font-mono text-xs"
              title="Download résumé"
              id="download-cv-btn"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-brand-border/60 text-brand-muted hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal dialog"
              id="close-resume-modal-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-sans" id="resume-document-content">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-brand-border pb-6 gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{PROFILE.name}</h1>
              <p className="text-sm font-mono text-brand-primary font-bold uppercase tracking-wider">{PROFILE.title}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-muted pt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{PROFILE.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{PROFILE.email}</span>
                </span>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-xs sm:text-right text-brand-muted">
              <p>AVAILABILITY: <span className="text-emerald-400">{PROFILE.availability}</span></p>
              <p>LINKEDIN: <span className="text-slate-200">{PROFILE.linkedinLabel}</span></p>
              <p>UPDATED: <span className="text-slate-200">2026-06-01</span></p>
            </div>
          </div>

          {/* Grid distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Col: Experience + Projects */}
            <div className="md:col-span-2 space-y-6">
              <h3 className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-brand-border/40 pb-1.5">
                // PROFESSIONAL EXPERIENCE
              </h3>

              <div className="space-y-6">
                {WORK_HISTORY.map((job) => (
                  <div key={job.id}>
                    <div className="flex justify-between items-start mb-1 gap-3">
                      <h4 className="text-base font-bold text-white leading-tight">{job.title}</h4>
                      <span className="text-xs font-mono text-brand-primary whitespace-nowrap">{job.period}</span>
                    </div>
                    <p className="text-xs font-mono text-teal-400 font-semibold mb-2">
                      {job.company} · {job.location}
                    </p>
                    <ul className="text-xs sm:text-sm text-brand-text/80 space-y-1.5 pl-3 list-disc">
                      {job.highlights.slice(0, 3).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Key Projects */}
              <div className="space-y-3 pt-2">
                <h3 className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-brand-border/40 pb-1.5">
                  // KEY PROJECTS
                </h3>
                <div className="space-y-3">
                  {PROJECTS.filter((p) => p.githubUrl).map((proj) => (
                    <div key={proj.id} className="rounded border border-brand-border bg-brand-bg/40 px-4 py-3 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-brand-primary-bright font-bold">
                            {proj.architectureBadge}
                          </span>
                          <h4 className="text-sm font-bold text-white leading-snug">{proj.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 font-mono text-[10px] text-brand-muted hover:text-brand-primary-bright transition-colors"
                              title="View on GitHub"
                            >
                              <GithubIcon />
                              <span>GitHub</span>
                            </a>
                          )}
                          {proj.websiteUrl && (
                            <a
                              href={proj.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 font-mono text-[10px] text-brand-primary-bright hover:text-white transition-colors"
                              title="Live demo"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proj.stats.map((st, i) => (
                          <span key={i} className="font-mono text-[10px] text-brand-muted">
                            <span className="text-brand-primary-bright font-bold">{st.value}</span> {st.label}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {proj.tech.slice(0, 5).map((t) => (
                          <span key={t} className="rounded bg-brand-card border border-brand-border/60 px-2 py-0.5 font-mono text-[9px] text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Skills, Education, Certs */}
            <div className="space-y-6">
              {/* Core Tech */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-brand-border/40 pb-1.5 flex items-center space-x-1.5">
                  <Award className="h-3.5 w-3.5 text-brand-primary-bright" />
                  <span>// CORE TECH</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {CORE_TECH.map((st) => (
                    <span key={st} className="rounded bg-brand-card border border-brand-border px-2 py-0.5 font-mono text-[10px] text-slate-300">
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-brand-border/40 pb-1.5 flex items-center space-x-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-brand-primary" />
                  <span>// EDUCATION</span>
                </h3>
                <div className="space-y-3 text-xs">
                  {EDUCATION.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-white leading-snug">{edu.degree}</h4>
                      <p className="text-brand-muted font-mono">{edu.school} · {edu.location}</p>
                      <p className="text-[10px] font-mono text-brand-primary/80">
                        {edu.period}{edu.grade ? ` · ${edu.grade}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs font-bold tracking-widest text-brand-primary uppercase border-b border-brand-border/40 pb-1.5">
                  // CERTIFICATIONS
                </h3>
                <ul className="space-y-1 px-1 font-mono text-[11px] text-brand-text/75 leading-relaxed">
                  {CERTIFICATIONS.map((cert) => (
                    <li key={cert.id}>
                      ✔ {cert.name} <span className="text-brand-muted">— {cert.issuer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-brand-border bg-brand-card/50 px-5 py-3 text-center">
          <p className="font-mono text-[9px] text-brand-muted uppercase tracking-wider">
            {PROFILE.name} · {PROFILE.title} · {PROFILE.location}
          </p>
        </div>
      </div>
    </div>
  );
}
