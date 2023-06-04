import prisma from "./prisma";

type Props = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservations({
  listingId,
  userId,
  authorId,
}: Props) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: { listingId, userId, listing: { userId: authorId } },
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });
    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
