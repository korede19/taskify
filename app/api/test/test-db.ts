import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongodb"; // Import the function that connects to MongoDB

export async function GET() {
  try {
    const db = await connectToDB(); // Connect to the database
    const result = await db.command({ ping: 1 }); // Send a ping to MongoDB
    return NextResponse.json({
      success: true,
      message: "MongoDB connection is successful",
      result,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return NextResponse.json(
      { success: false, error: "Database connection failed." },
      { status: 500 }
    );
  }
}
