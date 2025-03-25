import { type NextRequest, NextResponse } from "next/server";
import { withAuth, UserRole, getCurrentUser } from "@/lib/auth";
import { db, systemSettings } from "@/lib/db";
import { eq } from "drizzle-orm";
import { logAuditEvent } from "@/lib/audit";

// Get system settings
export const GET = withAuth(
  async (req: NextRequest, user) => {
    try {
      const url = new URL(req.url);
      const key = url.searchParams.get("key");

      const settingsResult = key
        ? await db.select().from(systemSettings).where(eq(systemSettings.key, key))
        : await db.select().from(systemSettings);

      await logAuditEvent(user.id, "admin_action", {
        action: "get_system_settings",
        key: key || "all",
      });

      return NextResponse.json({ settings: settingsResult }, { status: 200 });
    } catch (error: any) {
      console.error("System settings retrieval error:", error);
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  },
  [UserRole.ADMIN],
);

// Update system settings
export const PUT = withAuth(
  async (req: NextRequest, user) => {
    try {
      const body = await req.json();
      const { key, value, description } = body;

      if (!key || !value) {
        return NextResponse.json({ error: "Key and value are required" }, { status: 400 });
      }

      // Check existing setting
      const existing = await db
        .select()
        .from(systemSettings)
        .where(eq(systemSettings.key, key))
        .limit(1);

      if (existing.length === 0) {
        // Insert new setting
        await db.insert(systemSettings).values({
          key,
          value,
          description,
          updatedBy: Number(user.id),
        });
      } else {
        // Update existing setting
        await db
          .update(systemSettings)
          .set({
            value,
            description,
            updatedBy: Number(user.id),
            updatedAt: new Date(),
          })
          .where(eq(systemSettings.key, key));
      }

      await logAuditEvent(user.id, "system_configuration_changed", {
        key,
        previous_value: existing[0]?.value ?? null,
        new_value: value,
      });

      return NextResponse.json({ message: "System setting updated successfully" }, { status: 200 });
    } catch (error: any) {
      console.error("System settings update error:", error);
      return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
  },
  [UserRole.ADMIN],
);
