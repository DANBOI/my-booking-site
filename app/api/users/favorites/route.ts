import { NextResponse } from "next/server";

import getCurrentUser from "@/utils/getCurrentUser";
import prisma from "@/utils/prisma";

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { favoriteIds } = body;

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
