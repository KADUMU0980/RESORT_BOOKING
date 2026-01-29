import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/app/utils/config/db";
import bookingModel from "@/app/utils/models/bookingModel";

export async function POST(request) {
  try {
    console.log("🔵 POST /api/bookings/payment called");
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { bookingId, paymentMethod } = await request.json();
    console.log("Booking ID:", bookingId);

    if (!bookingId) {
      return NextResponse.json(
        { message: "Booking ID is required" },
        { status: 400 }
      );
    }

    const booking = await bookingModel.findById(bookingId).populate("user");

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.user.email !== session.user.email) {
      return NextResponse.json(
        { message: "Unauthorized access to booking" },
        { status: 403 }
      );
    }

    if (booking.status !== "approved") {
      return NextResponse.json(
        { message: "Payment only allowed for approved bookings" },
        { status: 400 }
      );
    }

    if (booking.paymentStatus === "paid") {
      return NextResponse.json(
        { message: "Booking already paid" },
        { status: 400 }
      );
    }

    const orderId = `ORDER_${Date.now()}_${bookingId.slice(-6)}`;
    console.log("✅ Payment initiated:", orderId);

    return NextResponse.json({
      success: true,
      orderId,
      amount: booking.price,
      currency: "INR",
      bookingId: booking._id,
      bookingDetails: {
        productName: booking.productName,
        startDate: booking.startDate,
        endDate: booking.endDate,
        price: booking.price
      }
    });

  } catch (error) {
    console.error("❌ Error initiating payment:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    console.log("🔵 PATCH /api/bookings/payment called");
    
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { bookingId, paymentId, paymentMethod, transactionId } = await request.json();

    if (!bookingId || !paymentId) {
      return NextResponse.json(
        { message: "Missing required payment details" },
        { status: 400 }
      );
    }

    const booking = await bookingModel.findById(bookingId).populate("user");

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.user.email !== session.user.email) {
      return NextResponse.json(
        { message: "Unauthorized access to booking" },
        { status: 403 }
      );
    }

    booking.paymentStatus = "paid";
    booking.paymentMethod = paymentMethod || "card";
    booking.paymentId = paymentId;
    booking.transactionId = transactionId || paymentId;
    booking.paymentDate = new Date();

    await booking.save();
    console.log("✅ Payment verified for booking:", bookingId);

    return NextResponse.json({
      success: true,
      message: "Payment successful",
      booking: JSON.parse(JSON.stringify(booking))
    });

  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error.message 
      },
      { status: 500 }
    );
  }
}