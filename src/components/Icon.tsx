/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Workflow,
  Layers,
  Cloud,
  Code,
  ShieldCheck,
  GitBranch,
  BarChart3,
  Database,
  type LucideProps,
} from 'lucide-react';
import { IconName } from '../types';

const MAP: Record<IconName, React.ComponentType<LucideProps>> = {
  Workflow,
  Layers,
  Cloud,
  Code,
  ShieldCheck,
  GitBranch,
  BarChart: BarChart3,
  Database,
};

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = MAP[name] ?? Database;
  return <Cmp {...props} />;
}
