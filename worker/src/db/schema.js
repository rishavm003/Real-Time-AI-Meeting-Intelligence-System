import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const meetings = sqliteTable('meetings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  transcript: text('transcript').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const summaries = sqliteTable('summaries', {
  id: text('id').primaryKey(),
  meetingId: text('meeting_id').notNull().references(() => meetings.id),
  overview: text('overview').notNull(),
  keyPoints: text('key_points').notNull(), // JSON string
  decisions: text('decisions').notNull(), // JSON string
  actionItems: text('action_items').notNull(), // JSON string
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
