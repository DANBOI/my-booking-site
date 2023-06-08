import prisma from "./prisma";

export type QueryProps = {
  category?: string;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
};

export default async function getListings({
  category,
  locationValue,
  startDate,
  endDate,
  guestCount = 1,
  roomCount = 1,
  bathroomCount = 1,
}: QueryProps) {
  try {
    const queryObj: any = {
      category,
      locationValue,
      guestCount: {
        gte: +guestCount,
      },
      roomCount: {
        gte: +roomCount,
      },
      bathroomCount: {
        gte: +bathroomCount,
      },
      //checks if there are no reservations that overlap with the given date range.
      NOT: {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      },
    };

    const listings = await prisma.listing.findMany({
      where: queryObj,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getListingById(id: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getListingsByFavoriteIds(ids: string[]) {
  try {
    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return favoriteListings;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getListingsByUserId(userId?: string) {
  if (!userId) return null;

  try {
    const listings = await prisma.listing.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
