import getCurrentUser from "@/utils/getCurrentUser";
import { getListings } from "@/utils/getListings";

import Category from "@/components/Category";
import Container from "@/components/Container";
import EmptyList from "@/components/lists/EmptyList";
import HomeListGrid from "@/components/lists/HomeListGrid";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings();
  return (
    <section>
      <Category />
      <Container>
        {listings.length ? (
          <HomeListGrid currentUser={currentUser} listings={listings} />
        ) : (
          <EmptyList showReset />
        )}
      </Container>
    </section>
  );
}
