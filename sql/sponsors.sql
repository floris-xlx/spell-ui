CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  email_verified integer DEFAULT false NOT NULL,
  image text,
  username text,
  created_at integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  updated_at integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users (email);
CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique ON users (username);

CREATE TABLE IF NOT EXISTS sponsors (
  id text PRIMARY KEY NOT NULL,
  user_id text NOT NULL,
  tier_id text NOT NULL,
  whop_payment_id text NOT NULL,
  amount integer NOT NULL,
  currency text NOT NULL,
  status text DEFAULT 'active' NOT NULL,
  logo_url text,
  logo_dark_url text,
  website_url text,
  created_at integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  updated_at integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX IF NOT EXISTS sponsors_whop_payment_id_unique ON sponsors (whop_payment_id);
CREATE INDEX IF NOT EXISTS sponsors_userId_idx ON sponsors (user_id);
CREATE INDEX IF NOT EXISTS sponsors_whopPaymentId_idx ON sponsors (whop_payment_id);
