/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Profile,
  WorkHistoryItem,
  SkillCategoryItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  QuickStat,
  FlowStage,
} from './types';

export const PROFILE: Profile = {
  name: 'Swapnil Sanjay Joijode',
  title: 'Data Engineer',
  location: 'United Kingdom',
  availability: 'Open to Data Engineer roles · UK',
  email: 'swapniljoijode22@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/swapniljoijode22',
  linkedinLabel: 'linkedin.com/in/swapniljoijode22',
  githubUrl: 'https://github.com/swapniljoijode',
  githubLabel: 'github.com/swapniljoijode',
  resumeFile: '/Swapnil-Joijode-Resume.pdf',
  tagline: 'Turning unreliable pipelines into governed platforms teams can trust.',
  summary:
    "Data Engineer with 3+ years of experience designing and maintaining ETL pipelines, data warehouse solutions, and scalable data workflows using SQL, Python, Airflow, Snowflake, and Databricks. Experienced in writing complex SQL queries, scripting automated data processing workflows, and implementing data quality measures to maintain data integrity across 2–3M+ records monthly. Skilled in data modelling, pipeline designs, workflow orchestration, and cross-functional collaboration across logistics, retail, and finance domains.",
};

export const QUICK_STATS: QuickStat[] = [
  { label: 'Years in Data Engineering', value: '3+' },
  { label: 'End-to-end pipelines shipped', value: '3' },
  { label: 'Governed KPIs delivered', value: '50+' },
];

// Real architecture: how the tools actually connect end to end.
export const PIPELINE_FLOW: FlowStage[] = [
  { id: 'flow-1', label: 'Ingestion', detail: 'AWS S3 · Kafka · batch + near-real-time', iconName: 'Cloud' },
  { id: 'flow-2', label: 'Orchestration', detail: 'Airflow DAGs · AWS Lambda', iconName: 'Workflow' },
  { id: 'flow-3', label: 'Processing', detail: 'Spark · PySpark', iconName: 'Code' },
  { id: 'flow-4', label: 'Transform & Warehouse', detail: 'dbt · Snowflake · Databricks', iconName: 'Database' },
  { id: 'flow-5', label: 'Semantic Layer', detail: 'Kimball models · governed metrics', iconName: 'Layers' },
  { id: 'flow-6', label: 'Consumption', detail: 'Power BI · Tableau · Looker', iconName: 'BarChart' },
];

export const WORK_HISTORY: WorkHistoryItem[] = [
  {
    id: 'exp-1',
    title: 'Data & Analytics Engineer',
    company: 'Kalven Group LLC',
    location: 'Dallas, TX',
    period: 'Dec 2025 – Present',
    highlights: [
      'Engineered modular, Airflow-orchestrated Spark and ELT workflows across Snowflake and Databricks processing 2–3M logistics records monthly, cutting reconciliation defects from ~70 to under 15 per cycle across 40+ stakeholders.',
      'Architected reusable dbt transformation frameworks and governed data marts, standardising 50+ KPI definitions and reducing model delivery effort by 2–4 hours per request.',
      'Refactored legacy batch workflows into maintainable Airflow DAGs, Spark jobs, and AWS Lambda pipelines, reducing end-to-end runtime from 90 to 55 minutes.',
      'Implemented automated validation, schema tests, and source-freshness monitoring in Python, SQL, and dbt, cutting manual QA effort from 6–7 hours to 2–3 hours per cycle.',
      'Analysed parcel-level data across 200+ hub and route combinations, surfacing delay clusters that drove routing changes and cut late deliveries on the five highest-risk routes by 18%.',
    ],
    tags: ['AIRFLOW', 'SPARK', 'SNOWFLAKE', 'DATABRICKS', 'DBT', 'AWS'],
    isPresent: true,
  },
  {
    id: 'exp-2',
    title: 'Data Analyst & Power BI Developer',
    company: 'Vision Group Retail Inc.',
    location: 'Hauppauge, NY',
    period: 'Aug 2024 – Nov 2025',
    highlights: [
      'Redesigned Snowflake dimensional models and semantic-layer inputs, shrinking model size from 10 GB to 1 GB and refresh time from 10 to 2 minutes across 500K+ records.',
      'Enforced automated SQL and Python data-quality controls across 500K+ records per refresh, reducing source discrepancies from thousands to single-digit mismatches against Azure SQL baselines.',
      'Deployed Python ETL services and dbt workflows through GitLab CI/CD with automated testing and rollback, eliminating 12+ manual reporting processes per quarter.',
      'Delivered 50+ governed business metrics through Snowflake-integrated semantic models as a governed consumption tier.',
    ],
    tags: ['SNOWFLAKE', 'DBT', 'POWER BI', 'GITLAB CI/CD', 'AZURE SQL'],
  },
  {
    id: 'exp-3',
    title: 'Data Analyst',
    company: 'TekSolve IT Solutions Inc.',
    location: 'United States',
    period: 'Aug 2023 – Dec 2023',
    highlights: [
      'Designed automated SQL and Python validation across 50K+ monthly HR and payroll records, cutting report error rate from 0.58% to 0.18% and holding SLA compliance across three consecutive cycles.',
      'Automated checks that flagged discrepancies 3–5 days earlier than manual review, improving on-time monthly reporting.',
      'Built star-schema data models for HR and finance, cutting dashboard rebuild requests by 40% through reusable models and self-service documentation.',
    ],
    tags: ['SQL', 'PYTHON', 'STAR SCHEMA', 'QA AUTOMATION'],
  },
  {
    id: 'exp-4',
    title: 'Senior Business Analyst',
    company: 'Quantum Phinance Consulting',
    location: 'Mumbai, India',
    period: 'Jan 2020 – Dec 2021',
    highlights: [
      'Delivered automated reporting logic and KPI dashboards across ~100 financial assets, improving decision-making efficiency by 30% for risk and finance stakeholders.',
      'Standardised 20+ BRDs, FRDs, and SOPs, reducing clarification cycles from 4–5 per change request to under 2 and improving on-time delivery by 20%.',
    ],
    tags: ['REPORTING', 'KPI DASHBOARDS', 'REQUIREMENTS', 'FINANCE'],
  },
];

export const SKILL_CATEGORIES: SkillCategoryItem[] = [
  {
    id: 'skill-1',
    categoryName: 'DATA PIPELINE ENGINEERING',
    iconName: 'Workflow',
    skills: ['Apache Airflow', 'Apache Spark / PySpark', 'Apache Kafka', 'Apache Flink', 'ETL / ELT Pipelines', 'Event-Driven & Near-Real-Time'],
  },
  {
    id: 'skill-2',
    categoryName: 'ANALYTICS ENGINEERING & MODELING',
    iconName: 'Layers',
    skills: ['dbt (tests + source freshness)', 'Dimensional Modeling (Kimball)', 'Data Marts', 'Semantic Layer', 'Data Contracts', 'Governed Datasets'],
  },
  {
    id: 'skill-3',
    categoryName: 'CLOUD & DATA PLATFORMS',
    iconName: 'Cloud',
    skills: ['Snowflake', 'Databricks', 'AWS (Glue / Lambda / S3)', 'GCP BigQuery', 'Azure SQL', 'PostgreSQL · Docker'],
  },
  {
    id: 'skill-4',
    categoryName: 'LANGUAGES & SOFTWARE ENGINEERING',
    iconName: 'Code',
    skills: ['Python', 'SQL', 'Snowflake / Databricks SQL', 'DAX', 'Clean Code · OOP', 'Refactoring · SDLC'],
  },
  {
    id: 'skill-5',
    categoryName: 'DATA QUALITY & GOVERNANCE',
    iconName: 'ShieldCheck',
    skills: ['Automated Validation', 'Schema Testing', 'Source Freshness', 'Pipeline Observability', 'RBAC & Access Controls', 'CDC'],
  },
  {
    id: 'skill-6',
    categoryName: 'CI/CD & CONSUMPTION',
    iconName: 'GitBranch',
    skills: ['GitLab CI/CD', 'GitHub Actions', 'Azure DevOps', 'Terraform', 'Power BI · Tableau', 'Looker · Sigma'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'Valorant Game Data Pipeline',
    context: 'Individual Case Study',
    description:
      'A production-pattern ELT warehouse built around Valorant gameplay data. A statistically realistic simulation engine replaces absent match telemetry, covering match timelines, rank progression, and per-round credit economy — then a modular Python ELT pipeline loads it into a Dockerised PostgreSQL warehouse modelled with dbt.',
    architectureBadge: 'ELT / DBT / POSTGRES',
    stats: [
      { label: 'Simulated records', value: '~10,220' },
      { label: 'dbt models', value: '24' },
      { label: 'Passing tests', value: '87 · 0 failures' },
    ],
    tech: ['Python', 'PostgreSQL', 'dbt', 'Docker', 'SQLAlchemy', 'pytest'],
    githubUrl: 'https://github.com/swapniljoijode/Game-Data-generator-and-ETL-Pipeline',
    codeLabel: 'fct_player_performance.sql',
    pipelineCode: `-- dbt star-schema mart: governed, fully tested
{{ config(materialized='table') }}

SELECT
    p.player_key,
    a.agent_key,
    m.map_key,
    COUNT(DISTINCT r.match_id) AS matches_played,
    AVG(r.combat_score)        AS avg_combat_score,
    SUM(r.credits_spent)       AS total_credits_spent
FROM {{ ref('stg_rounds') }}      r
JOIN {{ ref('dim_player') }}      p ON r.player_id = p.player_id
JOIN {{ ref('dim_agent') }}       a ON r.agent_id  = a.agent_id
JOIN {{ ref('dim_map') }}         m ON r.map_id    = m.map_id
GROUP BY 1, 2, 3
-- 87 dbt tests assert referential integrity, uniqueness, accepted values`,
  },
  {
    id: 'proj-2',
    name: 'Fashion Retail Intelligence Platform',
    context: 'Individual Case Study',
    description:
      'Zero-cost enterprise analytics platform for fashion retail built on a full medallion architecture. A Python data generator produces ~1M rows across sales, inventory, returns, web events, and markdowns — loaded into Cloudflare R2 then transformed through DuckDB and Snowflake by 24 dbt models with SCD Type 2 surrogate keys, delivered as a static Next.js dashboard on Vercel that survives warehouse trial expiry.',
    architectureBadge: 'MEDALLION / DBT / SNOWFLAKE',
    stats: [
      { label: 'Synthetic rows', value: '~1M' },
      { label: 'dbt models', value: '24' },
      { label: 'Tests passing', value: '190 · 100%' },
    ],
    tech: ['Python', 'DuckDB', 'Snowflake', 'dbt', 'Airflow', 'Cloudflare R2', 'Next.js', 'GitHub Actions', 'Docker'],
    githubUrl: 'https://github.com/swapniljoijode/Retail-Fashion-Intelligence',
    websiteUrl: 'https://retail-fashion-intelligence.vercel.app',
    codeLabel: 'fct_sales.sql',
    pipelineCode: `-- Grain: one row per order line.
-- SCD Type 2 date-range joins resolve surrogate keys active at time of sale.
{{ config(materialized='table') }}

WITH stg_sales AS (SELECT * FROM {{ ref('stg_bronze__fact_sales') }}),
dim_product   AS (SELECT product_key, product_id, effective_date, expiry_date
                  FROM {{ ref('int_product__scd2_surrogate') }}),
dim_customer  AS (SELECT customer_key, customer_id, effective_date, expiry_date
                  FROM {{ ref('int_customer__scd2_surrogate') }})

SELECT
    s.sale_key, s.order_id, s.order_line_id, s.sale_date,
    s.gross_revenue, s.discount_amount, s.net_revenue,
    s.cogs, s.gross_margin,
    COALESCE(p.product_key,  -1) AS product_key,
    COALESCE(c.customer_key, -1) AS customer_key
FROM stg_sales AS s
LEFT JOIN dim_product  AS p
    ON s.product_id = p.product_id
   AND s.sale_date BETWEEN p.effective_date AND COALESCE(p.expiry_date, CURRENT_DATE)
LEFT JOIN dim_customer AS c
    ON s.customer_id = c.customer_id
   AND s.sale_date BETWEEN c.effective_date AND COALESCE(c.expiry_date, CURRENT_DATE)
-- 190 dbt tests: uniqueness, not-null, referential integrity, accepted-values`,
  },
  {
    id: 'proj-3',
    name: 'Project Tracker',
    context: 'Individual Case Study',
    description:
      'A full-stack project-tracking application built as a companion to the Fashion Retail Intelligence Platform — and a portfolio-grade demonstration of engineering range in its own right. Separates data from deployment: task state flows through a REST API backed by Neon Postgres; the Next.js app rebuilds only when code changes, never when a status changes. Integrates with the retail repo through a versioned migration template and API contract rather than shared code.',
    architectureBadge: 'FULL-STACK / NEXT.JS / POSTGRES',
    stats: [
      { label: 'API layer', value: 'Next.js Routes' },
      { label: 'Datastore', value: 'Neon Postgres' },
      { label: 'Exports', value: 'Excel · CSV · PPTX' },
    ],
    tech: ['Next.js 15', 'TypeScript', 'Neon Postgres', 'Drizzle ORM', 'Recharts', 'Docker', 'GitHub Actions', 'TailwindCSS'],
    githubUrl: 'https://github.com/swapniljoijode/Project-Tracker',
    websiteUrl: 'https://project-tracker-lyart-seven.vercel.app',
    codeLabel: 'drizzle.config.ts',
    pipelineCode: `// Drizzle ORM schema — task audit trail separated from current state
// so every status change is captured once and consistently.
export const task = pgTable('task', {
  taskId:        serial('task_id').primaryKey(),
  phaseId:       integer('phase_id').references(() => phase.phaseId),
  title:         varchar('title', { length: 200 }).notNull(),
  currentStatus: statusEnum('current_status').notNull().default('ongoing'),
  createdAt:     timestamp('created_at').defaultNow(),
});

export const taskEvent = pgTable('task_event', {
  eventId:   serial('event_id').primaryKey(),
  taskId:    integer('task_id').references(() => task.taskId),
  status:    statusEnum('status').notNull(),
  note:      text('note'),
  commitRef: varchar('commit_ref', { length: 80 }),
  timestamp: timestamp('timestamp').defaultNow(),
});
// taskEvent = full audit trail; task.currentStatus = fast read surface`,
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'M.S., Data Analytics (Information Management)',
    school: 'Clark University',
    location: 'United States',
    period: 'Jan 2022 – Dec 2023',
    grade: 'GPA 3.4 / 4.0',
  },
  {
    id: 'edu-2',
    degree: 'B.E., Electronics & Telecommunication Engineering',
    school: 'University of Mumbai',
    location: 'India',
    period: 'Aug 2015 – Jun 2019',
    grade: '6.7 / 10',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { id: 'cert-1', name: 'Data Engineer Associate', issuer: 'DataCamp · Mar 2025' },
  { id: 'cert-2', name: 'Google Data Analytics', issuer: 'Coursera · May 2024' },
  { id: 'cert-3', name: 'ETL Testing', issuer: 'Udemy · Apr 2024' },
  { id: 'cert-4', name: 'Data Warehousing', issuer: 'Udemy · Feb 2024' },
];

// Flat skill list for the resume modal "core tech" chips.
export const CORE_TECH: string[] = [
  'Python', 'SQL', 'PySpark', 'Snowflake', 'Databricks', 'dbt', 'Apache Airflow',
  'Apache Spark', 'Kafka', 'AWS', 'GCP BigQuery', 'Azure SQL', 'Terraform',
  'GitLab CI/CD', 'GitHub Actions', 'Power BI', 'Tableau', 'Docker',
];
