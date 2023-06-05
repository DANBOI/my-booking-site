import getCurrentUser from "@/utils/getCurrentUser";
import { getListingsByFavoriteIds } from "@/utils/getListings";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import FavoritesListGrid from "@/components/lists/FavoritesListGrid";
import EmptyList from "@/components/lists/EmptyList";

export default async function FavoritesPage() {
  const currentUser = await getCurrentUser();
  const listings = await getListingsByFavoriteIds(
    currentUser?.favoriteIds || []
  );

  return (
    <section className="py-8">
      {listings.length ? (
        <Container>
          <Heading title="Favorites" subtitle="The places of your Favorites" />
          <FavoritesListGrid currentUser={currentUser} listings={listings} />
        </Container>
      ) : (
        <EmptyList
          title="No favorites found"
          subtitle="You have no favorite places."
        />
      )}
    </section>
  );
}
