import { NextResponse } from "next/server";

import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/utils/prisma";

type props = {
  params: {
    reservationId?: string;
  };
};

export async function DELETE(
  request: Request,
  { params: { reservationId } }: props
) {
  if (!reservationId) throw new Error("Invalid ID");

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      // customer or ownor can delete
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });
  // returns a count of the deleted records
  return NextResponse.json(reservation);
}
