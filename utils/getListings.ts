import prisma from "./prisma";

export async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
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
