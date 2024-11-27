import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import PasswordResetToken from "@/models/passwordResetTokens";
import { sendPasswordResetEmail } from "@/lib/emailService";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No account associated with this email" },
        { status: 404 }
      );
    }

    // Generate a reset token
    const resetToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save or update reset token in database
    await PasswordResetToken.findOneAndUpdate(
      { userId: user._id },
      {
        token: resetToken,
        expiresAt: resetTokenExpiry,
      },
      { upsert: true, new: true }
    );

    // Send reset email
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);

    return NextResponse.json(
      { message: "Password reset link sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
