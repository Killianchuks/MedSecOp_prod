import { NextResponse } from "next/server";
import { db, settings, users } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { eq, like, or, and } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(settings.key, `%${search}%`),
          like(settings.value, `%${search}%`),
          like(settings.description, `%${search}%`)
        )
      );
    }

    const result = await db
      .select({
        id: settings.id,
        key: settings.key,
        value: settings.value,
        description: settings.description,
        updatedBy: settings.updatedBy, // the user ID (FK)
        updatedByUser: {   
          firstName: users.firstName,
          lastName: users.lastName,
        },
      })
      .from(settings)
      .leftJoin(users, eq(settings.updatedBy, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return NextResponse.json({ settings: result });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { key, value, description } = await req.json();

    if (!key || !value) {
      return NextResponse.json(
        { message: "Key and value are required" },
        { status: 400 }
      );
    }

    const existingSetting = await db
      .select({ id: settings.id })
      .from(settings)
      .where(eq(settings.key, key))
      .limit(1);

    if (existingSetting.length > 0) {
      return NextResponse.json(
        { message: "Setting with this key already exists" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(settings)
      .values({
        key,
        value,
        description,
        updatedBy: Number.parseInt(currentUser.id),
      })
      .returning({ id: settings.id });

    return NextResponse.json(
      {
        message: "Setting created successfully",
        settingId: result[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating setting:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the setting" },
      { status: 500 }
    );
  }
}
