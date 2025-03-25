import { pgTable, serial, text, varchar, timestamp, boolean, pgEnum, integer } from "drizzle-orm/pg-core";

// Enums
export const roleEnum = pgEnum("role", ["ADMIN", "DOCTOR", "PATIENT"]);
export const caseStatusEnum = pgEnum("case_status", ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);
export const casePriorityEnum = pgEnum("case_priority", ["LOW", "MEDIUM", "HIGH", "URGENT"]);

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  passwordSalt: varchar("password_salt", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  role: roleEnum("role").notNull(),
  licenseNumber: varchar("license_number", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  lastLogin: timestamp("last_login"),
  isVerified: boolean("is_verified").default(false).notNull(),
  verificationToken: varchar("verification_token", { length: 255 }),
  verificationTokenExpires: timestamp("verification_token_expires"),
  resetToken: varchar("reset_token", { length: 255 }),
  resetTokenExpires: timestamp("reset_token_expires"),
});

// Cases Table
export const cases = pgTable("cases", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id")
    .references(() => users.id)
    .notNull(),
  doctorId: integer("doctor_id").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: caseStatusEnum("status").notNull().default("PENDING"),
  priority: casePriorityEnum("priority").notNull().default("MEDIUM"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Settings Table (General Settings)
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: integer("updated_by")
    .references(() => users.id)
    .notNull(),
});

// System Settings Table
export const systemSettings = pgTable("system_settings", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: text("value").notNull(),
  description: text("description"),
  updatedBy: integer("updated_by")
    .references(() => users.id)
    .notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
