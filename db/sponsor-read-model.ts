import { db } from "@/db";
import { users } from "@/db/schemas/auth";
import { sponsors } from "@/db/schemas/sponsor";
import { eq } from "drizzle-orm";

export interface SponsorDisplayRow {
  tierId: string;
  userName: string;
  userImage: string | null;
  logoUrl: string | null;
  logoDarkUrl: string | null;
  websiteUrl: string | null;
}

const CREATE_SPONSORS_TABLE_SQL = `
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
)`;

const CREATE_USERS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  email_verified integer DEFAULT false NOT NULL,
  image text,
  username text,
  created_at integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
  updated_at integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
)`;

const USERS_INDEX_SQL = [
  "CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users (email)",
  "CREATE UNIQUE INDEX IF NOT EXISTS users_username_unique ON users (username)",
] as const;

const SPONSORS_INDEX_SQL = [
  "CREATE UNIQUE INDEX IF NOT EXISTS sponsors_whop_payment_id_unique ON sponsors (whop_payment_id)",
  "CREATE INDEX IF NOT EXISTS sponsors_userId_idx ON sponsors (user_id)",
  "CREATE INDEX IF NOT EXISTS sponsors_whopPaymentId_idx ON sponsors (whop_payment_id)",
] as const;

const OPTIONAL_SPONSOR_COLUMNS = [
  { name: "logo_url", sql: "ALTER TABLE sponsors ADD COLUMN logo_url text" },
  {
    name: "logo_dark_url",
    sql: "ALTER TABLE sponsors ADD COLUMN logo_dark_url text",
  },
  { name: "website_url", sql: "ALTER TABLE sponsors ADD COLUMN website_url text" },
] as const;

const OPTIONAL_USER_COLUMNS = [
  { name: "username", sql: "ALTER TABLE users ADD COLUMN username text" },
] as const;

let sponsorsTableReady: Promise<void> | null = null;

async function ensureSponsorsTable() {
  sponsorsTableReady ??= createSponsorsTableIfMissing().catch((error) => {
    sponsorsTableReady = null;
    throw error;
  });

  return sponsorsTableReady;
}

async function createSponsorsTableIfMissing() {
  await db.run(CREATE_USERS_TABLE_SQL);
  await db.run(CREATE_SPONSORS_TABLE_SQL);

  await addMissingColumns("users", OPTIONAL_USER_COLUMNS);
  await addMissingColumns("sponsors", OPTIONAL_SPONSOR_COLUMNS);

  for (const statement of USERS_INDEX_SQL) {
    await db.run(statement);
  }

  for (const statement of SPONSORS_INDEX_SQL) {
    await db.run(statement);
  }
}

async function addMissingColumns(
  tableName: "sponsors" | "users",
  columns: readonly { name: string; sql: string }[],
) {
  const existingColumns = await db.all<{ name: string }>(
    `PRAGMA table_info(${tableName})`,
  );
  const columnNames = new Set(existingColumns.map((column) => column.name));

  for (const column of columns) {
    if (!columnNames.has(column.name)) {
      await db.run(column.sql);
    }
  }
}

export async function getActiveSponsorRows(): Promise<SponsorDisplayRow[]> {
  try {
    await ensureSponsorsTable();

    return await db
      .select({
        tierId: sponsors.tierId,
        userName: users.name,
        userImage: users.image,
        logoUrl: sponsors.logoUrl,
        logoDarkUrl: sponsors.logoDarkUrl,
        websiteUrl: sponsors.websiteUrl,
      })
      .from(sponsors)
      .innerJoin(users, eq(sponsors.userId, users.id))
      .where(eq(sponsors.status, "active"));
  } catch (error) {
    console.warn("Unable to load sponsors; rendering without sponsor data.", error);
    return [];
  }
}
