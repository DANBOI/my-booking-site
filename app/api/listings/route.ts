import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  //serverside validation
  if (Object.values(body).some((value: any) => !value))
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: +price,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
