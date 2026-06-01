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
    "Data Engineer with 3+ years designing scalable Python-based data pipelines, modular transformation frameworks, and maintainable cloud data systems across Snowflake, Databricks, Spark, Airflow, and AWS. Engineering-first approach: clean modular code, automated schema tests and source-freshness checks, CI/CD, and observability built in. Proven track record improving pipeline reliability, reducing reconciliation defects, and delivering production-ready data platforms across logistics, retail, and financial services.",
};

export const QUICK_STATS: QuickStat[] = [
  { label: 'Years in Data', value: '3+' },
  { label: 'Logistics records / month', value: '2–3M' },
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
    name: 'Multi-Channel Brand Performance Analytics',
    context: 'Vision Group Retail Inc.',
    description:
      'Consolidated fragmented brand-performance data across multiple sales channels into a single governed analytics layer — eliminating inconsistent metrics and enabling self-serve access for 40+ stakeholders across sales, marketing, and operations.',
    architectureBadge: 'STAR SCHEMA / POWER BI',
    stats: [
      { label: 'Rows governed', value: '1.2M+' },
      { label: 'Stakeholders', value: '40+' },
      { label: 'Reporting model', value: 'Self-serve' },
    ],
    tech: ['SQL', 'Dimensional Modeling', 'Power BI', 'DAX'],
    codeLabel: 'brand_performance_metric.dax',
    pipelineCode: `// Governed, reusable DAX measure on a star-schema model
Net Revenue (YoY %) =
VAR _current =
    CALCULATE ( [Net Revenue], DATESYTD ( 'Dim Date'[Date] ) )
VAR _prior =
    CALCULATE (
        [Net Revenue],
        SAMEPERIODLASTYEAR ( DATESYTD ( 'Dim Date'[Date] ) )
    )
RETURN
    DIVIDE ( _current - _prior, _prior )`,
  },
  {
    id: 'proj-3',
    name: 'OTT Subscriber Churn Prediction Pipeline',
    context: 'Individual Case Study',
    description:
      'End-to-end pipeline operationalising subscriber-churn risk for an OTT platform — from raw event ingestion through feature engineering to production-ready model serving as a consumable data product.',
    architectureBadge: 'ML PIPELINE / AWS',
    stats: [
      { label: 'Model signal', value: '0.75 TPR @ 0.20 FPR' },
      { label: 'Serving', value: 'Flask API' },
      { label: 'Stack', value: 'AWS Glue · SageMaker' },
    ],
    tech: ['Python', 'AWS Glue', 'SageMaker', 'S3', 'Flask', 'scikit-learn'],
    codeLabel: 'serve_churn_model.py',
    pipelineCode: `# Flask endpoint serving the trained churn model as a data product
@app.route("/predict", methods=["POST"])
def predict():
    features = build_feature_vector(request.get_json())
    proba = model.predict_proba([features])[0][1]
    return jsonify({
        "churn_probability": round(float(proba), 4),
        "risk_segment": "high" if proba >= 0.5 else "low",
    })`,
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
  { id: 'cert-1', name: 'Data Engineer Associate', issuer: 'DataCamp' },
  { id: 'cert-2', name: 'ETL Testing', issuer: 'Udemy' },
  { id: 'cert-3', name: 'Data Warehousing', issuer: 'Udemy' },
  { id: 'cert-4', name: 'Google Data Analytics', issuer: 'Google' },
  { id: 'cert-5', name: 'Python Programming', issuer: 'Certification' },
];

// Flat skill list for the resume modal "core tech" chips.
export const CORE_TECH: string[] = [
  'Python', 'SQL', 'PySpark', 'Snowflake', 'Databricks', 'dbt', 'Apache Airflow',
  'Apache Spark', 'Kafka', 'AWS', 'GCP BigQuery', 'Azure SQL', 'Terraform',
  'GitLab CI/CD', 'GitHub Actions', 'Power BI', 'Tableau', 'Docker',
];
