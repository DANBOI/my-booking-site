import getCurrentUser from "@/utils/getCurrentUser";
import getListings, { QueryProps } from "@/utils/getListings";

import Category from "@/components/Category";
import Container from "@/components/Container";
import EmptyList from "@/components/lists/EmptyList";
import HomeListGrid from "@/components/lists/HomeListGrid";

export type Props = {
  searchParams: QueryProps;
};

export default async function Home({ searchParams }: Props) {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);
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
