/*
# Marketing Site Database Schema – Elvin Şahbazov Personal Brand

## Overview
This migration creates the full database schema for a public personal brand and
marketing website. There is NO user authentication – all tables are publicly
readable/writable via the anon key. Every policy uses `TO anon, authenticated`
so the frontend (which always talks via the anon key) can operate without
a signed-in session.

## New Tables

### 1. `forum_leads`
Captures registrations from the Digital Marketing Forum countdown block.
- `id` – UUID primary key.
- `full_name` – Visitor's full name (required).
- `email` – Visitor's email address (required, validated at app layer).
- `phone` – Optional phone/WhatsApp number.
- `business_type` – Free-text description of their business/industry.
- `message` – Optional note or question for Elvin.
- `source` – Which page/block the lead came from (default 'forum').
- `created_at` – Submission timestamp.

### 2. `calculator_sessions`
Persists each Smart Reklam Hesablayıcı PRO session so leads and scenarios
are never lost when the user closes the tab.
- `id` – UUID primary key.
- `user_name` – Name entered in the gatekeeper modal.
- `user_email` – Gmail entered in the gatekeeper modal.
- `preset_name` – Which preset was selected (ecommerce, clinic, etc.), nullable.
- `product_price` – Məhsul/Xidmət qiyməti in AZN.
- `cogs` – Maya dəyəri in AZN.
- `margin_pct` – Calculated margin percentage.
- `total_budget` – Sum of all enabled channel budgets.
- `total_revenue` – Sum of all expected revenues (budget × ROAS).
- `net_profit` – Revenue minus budget minus COGS portion.
- `blended_roas` – Weighted average ROAS across all enabled channels.
- `break_even_roas` – Minimum ROAS needed to break even.
- `channels_snapshot` – JSONB array of all channel configs at save time.
- `created_at` – Session creation timestamp.

### 3. `contact_submissions`
General contact/inquiry form submissions from anywhere on the site.
- `id` – UUID primary key.
- `full_name` – Sender's name (required).
- `email` – Sender's email (required).
- `phone` – Optional contact number.
- `subject` – Brief topic (e.g. "Reklam xidməti").
- `message` – Full message body (required).
- `page_source` – Which page the form was submitted from.
- `created_at` – Submission timestamp.
- `is_read` – Admin flag; default false (for future admin panel use).

### 4. `newsletter_subscribers`
Email list for marketing updates and forum announcements.
- `id` – UUID primary key.
- `email` – Subscriber email, unique constraint to prevent duplicates.
- `full_name` – Optional display name.
- `source` – Where they subscribed from (footer, forum_block, etc.).
- `is_active` – Whether the subscription is active; default true.
- `subscribed_at` – When they signed up.

## Security
- RLS is ENABLED on all four tables.
- All policies are scoped to `anon, authenticated` because this site has no
  login screen – every request runs under the anon key.
- SELECT on `contact_submissions` and `forum_leads` uses `USING (true)` because
  the site itself is public and data is intentionally shared with the site owner
  (not multi-tenant user data).
- The `is_read` column on `contact_submissions` is intentionally write-once from
  the frontend (insert only); updates are blocked at the policy level for now
  and reserved for a future admin dashboard.
- `newsletter_subscribers.email` has a UNIQUE constraint so duplicate subscribes
  are cleanly rejected (the app will handle the error gracefully with an "already
  subscribed" message).

## Indexes
- `forum_leads(email)` – for deduplication lookups.
- `calculator_sessions(user_email)` – to retrieve a user's past scenarios.
- `contact_submissions(created_at DESC)` – for chronological admin review.
- `newsletter_subscribers(email)` – unique index already implied by constraint.
*/

-- ─── forum_leads ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS forum_leads (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     text NOT NULL,
  email         text NOT NULL,
  phone         text,
  business_type text,
  message       text,
  source        text NOT NULL DEFAULT 'forum',
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_forum_leads_email      ON forum_leads(email);
CREATE INDEX IF NOT EXISTS idx_forum_leads_created_at ON forum_leads(created_at DESC);

ALTER TABLE forum_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_forum_leads"  ON forum_leads;
DROP POLICY IF EXISTS "anon_insert_forum_leads"  ON forum_leads;
DROP POLICY IF EXISTS "anon_update_forum_leads"  ON forum_leads;
DROP POLICY IF EXISTS "anon_delete_forum_leads"  ON forum_leads;

CREATE POLICY "anon_select_forum_leads" ON forum_leads
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_forum_leads" ON forum_leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Update and delete are intentionally omitted – leads are append-only from the frontend.


-- ─── calculator_sessions ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS calculator_sessions (
  id                uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name         text    NOT NULL,
  user_email        text    NOT NULL,
  preset_name       text,
  product_price     numeric(12,2) NOT NULL DEFAULT 0,
  cogs              numeric(12,2) NOT NULL DEFAULT 0,
  margin_pct        numeric(6,2)  NOT NULL DEFAULT 0,
  total_budget      numeric(12,2) NOT NULL DEFAULT 0,
  total_revenue     numeric(12,2) NOT NULL DEFAULT 0,
  net_profit        numeric(12,2) NOT NULL DEFAULT 0,
  blended_roas      numeric(8,4)  NOT NULL DEFAULT 0,
  break_even_roas   numeric(8,4)  NOT NULL DEFAULT 0,
  channels_snapshot jsonb         NOT NULL DEFAULT '[]',
  created_at        timestamptz   NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_calc_user_email  ON calculator_sessions(user_email);
CREATE INDEX IF NOT EXISTS idx_calc_created_at  ON calculator_sessions(created_at DESC);

ALTER TABLE calculator_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_calc_sessions"  ON calculator_sessions;
DROP POLICY IF EXISTS "anon_insert_calc_sessions"  ON calculator_sessions;

CREATE POLICY "anon_select_calc_sessions" ON calculator_sessions
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_calc_sessions" ON calculator_sessions
  FOR INSERT TO anon, authenticated WITH CHECK (true);


-- ─── contact_submissions ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   text    NOT NULL,
  email       text    NOT NULL,
  phone       text,
  subject     text,
  message     text    NOT NULL,
  page_source text    NOT NULL DEFAULT 'contact',
  is_read     boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at DESC);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_contact"  ON contact_submissions;
DROP POLICY IF EXISTS "anon_insert_contact"  ON contact_submissions;

CREATE POLICY "anon_select_contact" ON contact_submissions
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_contact" ON contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);


-- ─── newsletter_subscribers ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id             uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  email          text    NOT NULL UNIQUE,
  full_name      text,
  source         text    NOT NULL DEFAULT 'footer',
  is_active      boolean NOT NULL DEFAULT true,
  subscribed_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_newsletter"  ON newsletter_subscribers;
DROP POLICY IF EXISTS "anon_insert_newsletter"  ON newsletter_subscribers;

CREATE POLICY "anon_select_newsletter" ON newsletter_subscribers
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);
