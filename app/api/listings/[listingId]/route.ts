import { NextResponse } from "next/server";

import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/utils/prisma";

type props = {
  params: {
    listingId?: string;
  };
};

export async function DELETE(
  request: Request,
  { params: { listingId } }: props
) {
  if (!listingId) throw new Error("Invalid ID");

  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });
  // returns a count of the deleted records
  return NextResponse.json(listing);
}
