import { NextResponse } from "next/server";

import prisma from "@/utils/prisma";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  //   const listingAndReservation = await prisma.listing.update({
  //     where: {
  //       id: listingId,
  //     },
  //     data: {
  //       reservations: {
  //         create: {
  //           userId: currentUser.id,
  //           startDate,
  //           endDate,
  //           totalPrice,
  //         },
  //       },
  //     },
  //   });

  const reservations = await prisma.reservation.create({
    data: { ...body, userId: currentUser.id },
  });

  return NextResponse.json(reservations);
}
