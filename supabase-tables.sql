-- Run this in Supabase SQL Editor so admission and contact data are stored correctly.
-- Admission: full form is stored in "data" jsonb; list columns are also stored for display.

-- 1) Admission applications (add data column if table already exists)
alter table admission_applications
  add column if not exists data jsonb;

-- If creating from scratch instead, use:
-- create table if not exists admission_applications (
--   id uuid primary key default gen_random_uuid(),
--   created_at timestamptz not null default now(),
--   first_name text,
--   last_name text,
--   email text,
--   phone text,
--   current_school text,
--   current_year text,
--   tuition_required text[],
--   data jsonb
-- );

-- 2) Contact messages (ensure message column exists)
alter table contact_messages
  add column if not exists message text;

-- If creating from scratch instead, use:
-- create table if not exists contact_messages (
--   id uuid primary key default gen_random_uuid(),
--   created_at timestamptz not null default now(),
--   name text,
--   email text,
--   phone text,
--   subject text,
--   message text
-- );

-- 3) Subjects (Maths, Biology, etc.) used for notes and exam resources
create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  slug text unique not null,
  -- e.g. 'GCSE', 'A-LEVEL', 'AS'
  level text not null
);

-- 4) Exam boards (AQA, Edexcel, OCR, etc.)
create table if not exists exam_boards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  slug text unique not null
);

-- 5) Exam resources (notes, past papers, solutions, videos, etc.)
-- This is flexible enough to cover:
-- - GCSE Maths grids (by board, tier, year, series)
-- - A-Level Maths boards and subjects
-- - Biology GCSE past paper links by board
create table if not exists exam_resources (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- What this resource belongs to
  subject_id uuid references subjects(id) on delete cascade,
  board_id uuid references exam_boards(id) on delete cascade,

  -- Year + session/grouping, e.g. 2025 + 'June', or 2024 + 'Practice'
  exam_year integer,
  exam_session text,

  -- Optional extra grouping info used in headings, e.g.
  -- 'June 2025 GCSE Practice Papers', 'June 2024 GCSE Practice Papers'
  series_label text,

  -- For Maths tiers like Higher/Foundation; can be null for subjects like Biology
  tier text,

  -- High-level category so you can filter between revision notes vs past papers
  -- Suggested values: 'NOTES', 'PAST_PAPER'
  resource_category text not null,

  -- Human label shown in the UI, e.g. 'Paper 1', 'Paper 1 Solutions', 'Grade boundaries'
  label text not null,

  -- Optional information about where this comes from, e.g. 'By Hannah Kettle Maths'
  source_label text,

  -- What kind of thing the URL points at
  -- Suggested values: 'PDF', 'VIDEO', 'LINK'
  media_type text not null,

  -- Either an external URL or a Supabase storage URL/path
  url text not null,

  -- For ordering within a section/table
  order_index integer default 0
);

