/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Terminal,
  Send,
  ShieldCheck,
  Activity,
  FileCheck,
  RefreshCw,
  Mail,
  User,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { PROFILE } from '../data';

/**
 * Web3Forms access key — free, safe to expose client-side.
 * Create one at https://web3forms.com (just enter your email), then paste it here.
 * Until it's set, the form falls back to a mailto: link so nothing is lost.
 */
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmailValid = formData.email.includes('@') && formData.email.includes('.');
  const isFormValid = formData.name.trim() !== '' && isEmailValid && formData.message.trim().length > 5;
  const keyConfigured = WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY' && WEB3FORMS_ACCESS_KEY.length > 0;

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || status === 'sending') return;

    setStatus('sending');
    setLogs([
      '[CHECK] Validating name, email, and message…  PASSED',
      `[SEND] Routing message from ${formData.email}…`,
    ]);

    // No key yet → don't pretend; open the user's mail client instead.
    if (!keyConfigured) {
      setLogs((prev) => [...prev, '[INFO] Opening your email client…']);
      mailtoFallback();
      setStatus('success');
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio enquiry from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLogs((prev) => [...prev, '[OK] Message delivered. I’ll reply to your email shortly.']);
        setStatus('success');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      setLogs((prev) => [...prev, '[ERROR] Delivery failed — please email me directly.']);
      setStatus('error');
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setLogs([]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 dot-grid min-h-screen" id="contact-screen">
      {/* breadcrumb */}
      <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-brand-muted uppercase mb-4" id="contact-header-breadcrumb">
        <Terminal className="h-4.5 w-4.5 text-brand-primary-bright" />
        <span>CONTACT</span>
        <span className="text-brand-primary">/</span>
        <span className="text-brand-text">GET IN TOUCH</span>
      </div>

      {/* Hero Header */}
      <div className="mb-12 max-w-4xl" id="contact-hero-text">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Let&apos;s build something <span className="text-brand-primary-bright">reliable</span>.
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-brand-muted max-w-3xl leading-relaxed">
          Hiring for a data engineering role, or want to talk pipelines and platforms? Send a message — it lands straight in my inbox.
        </p>
      </div>

      {/* Form Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" id="contact-grid-container">
        {/* Left Side: Contact Form */}
        <div className="lg:col-span-7" id="contact-form-panel">
          <div className="rounded-lg border border-brand-border bg-brand-card/90 p-5 sm:p-7 relative overflow-hidden" id="contact-box">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

            {status === 'success' ? (
              <div className="text-center py-8 space-y-6" id="contact-success-state">
                <div className="inline-flex p-3 rounded-full bg-brand-primary-dark/20 border border-brand-primary/30 text-brand-primary-bright mb-2">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-white">Message on its way!</h3>
                  <p className="text-sm text-brand-muted max-w-md mx-auto">
                    Thanks for reaching out — I&apos;ll get back to you at{' '}
                    <span className="text-brand-primary-bright">{formData.email || 'your email'}</span> as soon as I can.
                  </p>
                </div>
                <button
                  onClick={handleResetForm}
                  className="rounded border border-brand-border py-2 px-5 font-mono text-xs font-semibold text-white bg-transparent hover:bg-brand-card/65 transition-all cursor-pointer active:scale-95"
                  id="reset-form-btn"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name-input" className="block font-mono text-xs font-bold tracking-widest text-brand-muted uppercase">
                    Your Name / Organisation
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-brand-muted/70" />
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Jane Doe / DataCorp"
                      required
                      className="w-full rounded border border-brand-border bg-brand-bg pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-muted/50 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email-input" className="block font-mono text-xs font-bold tracking-widest text-brand-muted uppercase">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-brand-muted/70" />
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. you@company.com"
                      required
                      className="w-full rounded border border-brand-border bg-brand-bg pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-muted/50 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message-input" className="block font-mono text-xs font-bold tracking-widest text-brand-muted uppercase">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-brand-muted/70" />
                    <textarea
                      id="message-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about the role, the team, or the data problem you're solving…"
                      required
                      className="w-full rounded border border-brand-border bg-brand-bg pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-muted/50 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary transition-all font-mono leading-relaxed"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-start space-x-2 rounded border border-rose-500/40 bg-rose-500/10 px-3 py-2.5 text-xs text-rose-300">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>
                      Couldn&apos;t send the message. Please email me directly at{' '}
                      <a href={`mailto:${PROFILE.email}`} className="underline text-rose-200">
                        {PROFILE.email}
                      </a>
                      .
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!isFormValid || status === 'sending'}
                    className="w-full rounded bg-brand-primary text-brand-on-primary hover:bg-brand-primary-bright font-mono text-xs font-bold py-3 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    id="submit-contact-btn"
                  >
                    {status === 'sending' ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: live validation + status */}
        <div className="lg:col-span-5 space-y-6" id="contact-schema-constraints">
          <p className="font-mono text-xs font-bold tracking-widest text-brand-primary-bright uppercase mb-2">
            // FORM VALIDATION
          </p>

          <div className="rounded-lg border border-brand-border bg-brand-card/35 p-5 space-y-4" id="schema-rules">
            <h4 className="text-sm font-bold text-slate-100 font-mono flex items-center space-x-2">
              <FileCheck className="h-4 w-4 text-brand-primary-bright" />
              <span>field checks</span>
            </h4>

            <div className="space-y-3 font-mono text-xs" id="validations-rules-stack">
              <div className="flex items-center justify-between p-2 rounded bg-brand-bg border border-brand-border/40">
                <span className="text-slate-300">name</span>
                <span className={formData.name.trim() !== '' ? 'text-brand-primary-bright font-bold' : 'text-brand-muted'}>
                  {formData.name.trim() !== '' ? '[ OK ]' : '[ required ]'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-brand-bg border border-brand-border/40">
                <span className="text-slate-300">email</span>
                <span className={isEmailValid ? 'text-brand-primary-bright font-bold' : 'text-brand-muted'}>
                  {isEmailValid ? '[ OK ]' : '[ valid email ]'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-brand-bg border border-brand-border/40">
                <span className="text-slate-300">message</span>
                <span className={formData.message.trim().length > 5 ? 'text-brand-primary-bright font-bold' : 'text-brand-muted'}>
                  {formData.message.trim().length > 5 ? '[ OK ]' : '[ min 6 chars ]'}
                </span>
              </div>
            </div>
          </div>

          {/* Direct contact details */}
          <div className="rounded-lg border border-brand-border bg-brand-card/35 p-5 space-y-3 font-mono text-xs">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center space-x-2 text-slate-300 hover:text-brand-primary-bright transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span>{PROFILE.email}</span>
            </a>
            <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-300 hover:text-brand-primary-bright transition-colors">
              <Activity className="h-3.5 w-3.5" />
              <span>{PROFILE.linkedinLabel}</span>
            </a>
          </div>

          {/* Status log (honest steps only) */}
          {logs.length > 0 && (
            <div className="rounded-lg border border-brand-border bg-brand-bg p-4.5 space-y-2.5 font-mono text-[10px] sm:text-xs text-zinc-400">
              <div className="flex items-center space-x-2 uppercase text-brand-primary-bright font-bold mb-1.5">
                <Activity className="h-3.5 w-3.5 animate-signal" />
                <span>status</span>
              </div>
              <div className="space-y-1 max-h-[140px] overflow-y-auto leading-relaxed">
                {logs.map((log, idx) => {
                  let logColor = 'text-zinc-400';
                  if (log.includes('[OK]')) logColor = 'text-brand-primary-bright font-bold';
                  else if (log.includes('[ERROR]')) logColor = 'text-rose-400 font-bold';
                  else if (log.includes('[CHECK]')) logColor = 'text-emerald-400/80';
                  return (
                    <p key={idx} className={logColor}>
                      {log}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
