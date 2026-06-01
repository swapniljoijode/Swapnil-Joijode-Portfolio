/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Database } from 'lucide-react';
import { PIPELINE_FLOW } from '../data';
import Icon from './Icon';

/**
 * Animated, factual data-flow diagram showing how the real stack connects
 * end to end. No simulated metrics — just the architecture itself, with
 * "packets" travelling down the connectors between stages.
 */
export default function PipelineFlow() {
  return (
    <div
      className="rounded-lg border border-brand-border bg-brand-card/90 p-5 shadow-2xl relative overflow-hidden"
      id="pipeline-flow-widget"
    >
      {/* Gloss reflection */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary-bright/35 to-transparent" />

      {/* Widget header */}
      <div className="flex items-center justify-between border-b border-brand-border pb-3.5 mb-5">
        <div className="flex items-center space-x-2">
          <Database className="h-4 w-4 text-brand-primary" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-200">
            data_platform.flow
          </span>
        </div>
        <span className="rounded bg-brand-primary/10 border border-brand-primary/30 px-2 py-0.5 font-mono text-[9px] font-semibold text-brand-primary-bright uppercase tracking-wider">
          End-to-End
        </span>
      </div>

      {/* Vertical pipeline */}
      <div className="flex flex-col">
        {PIPELINE_FLOW.map((stage, idx) => {
          const isLast = idx === PIPELINE_FLOW.length - 1;
          return (
            <div key={stage.id}>
              {/* Stage node */}
              <div
                className="flex items-center space-x-3 rounded-lg border bg-brand-bg/60 px-3 py-2.5 animate-node-glow"
                style={{ animationDelay: `${idx * 0.4}s` }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-border/70 bg-brand-card text-brand-primary-bright">
                  <Icon name={stage.iconName} className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold text-slate-100 tracking-tight truncate">
                    {stage.label}
                  </p>
                  <p className="font-mono text-[10px] text-brand-muted truncate">
                    {stage.detail}
                  </p>
                </div>
                <span className="ml-auto font-mono text-[9px] text-brand-muted/70 tabular-nums">
                  0{idx + 1}
                </span>
              </div>

              {/* Connector with travelling packet */}
              {!isLast && (
                <div className="relative ml-[26px] h-7 w-px bg-gradient-to-b from-brand-primary/50 to-brand-primary/15">
                  <span
                    className="pipeline-packet absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-brand-primary-bright shadow-[0_0_8px_rgba(78,222,163,0.8)]"
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
