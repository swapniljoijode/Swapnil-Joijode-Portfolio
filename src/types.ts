/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type IconName =
  | 'Workflow'
  | 'Layers'
  | 'Cloud'
  | 'Code'
  | 'ShieldCheck'
  | 'GitBranch'
  | 'BarChart'
  | 'Database';

export interface Profile {
  name: string;
  title: string;
  location: string;
  availability: string;
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  githubLabel: string;
  resumeFile: string;
  tagline: string;
  summary: string;
}

export interface WorkHistoryItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  tags: string[];
  isPresent?: boolean;
}

export interface SkillCategoryItem {
  id: string;
  categoryName: string;
  iconName: IconName;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  context: string;
  description: string;
  architectureBadge: string;
  stats: { label: string; value: string }[];
  tech: string[];
  codeLabel?: string;
  pipelineCode?: string;
  githubUrl?: string;
  websiteUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  grade?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
}

export interface QuickStat {
  label: string;
  value: string;
}

export interface FlowStage {
  id: string;
  label: string;
  detail: string;
  iconName: IconName;
}
