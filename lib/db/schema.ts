import { create } from "domain";
import { is, relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, pgEnum, uuid} from "drizzle-orm/pg-core";
import { isAbsolute } from "path";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() =>  new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
// Enums pour les statuts
export const goalStatusEnum = pgEnum("goal_status", [
  "not_started", "in_progress", "completed", "archived"
]);
export const actionStatusEnum = pgEnum("action_status", [
  "todo", "in_progress", "done"
]);

// Enums pour les émotions
export const emotionEnum = pgEnum("emotion", [
    "JOIE",
    "TRISTE",
    "EN_COLERE",
    "ANXIEUXEUSE",
    "FATIGUEE",
  "RECONNAISSANTE",
  "EN_PAIX",
  "DISTRAITE",
  "MOTIVEE",
  "STRESSEE",
]);

  export const journalEntry = pgTable("journal_entry", {
    id: uuid ("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    emotion: emotionEnum("emotion"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  }, (table) => [index("journalEntry_userId_idx").on(table.userId)]);
  
  export const prayer= pgTable("prayer" , {
    id: uuid ("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type"),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },(table) => [index("prayer_userId_idx").on(table.userId)]);

  export const goals = pgTable("goals", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    status: goalStatusEnum("status").default("not_started").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    dueDate: timestamp("due_date"),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  }, (table) => [index("goals_userId_idx").on(table.userId)]);

  export const action = pgTable("action", {
  id: uuid("id").primaryKey().defaultRandom(),
  goalId: uuid("goal_id").references(() => goals.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  status: actionStatusEnum("status").default("todo").notNull(),
  priority: text("priority"), 
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
  index("action_goalId_idx").on(table.goalId),
  index("action_userId_idx").on(table.userId)
]);

export const bibleVerse = pgTable("bible_verse", {
  id: uuid("id").primaryKey().defaultRandom(),
  emotion: emotionEnum("emotion").notNull(),
  book: text("book").notNull(),
  chapter: text("chapter").notNull(),
  verse: text("verse").notNull(),
  content : text("content").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(), 
},(table) => [index("bibleVerse_emotion_idx").on(table.emotion)]);