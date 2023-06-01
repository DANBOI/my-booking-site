import getCurrentUser from "@/utils/getCurrentUser";
import getListings from "@/utils/getListing";

import Category from "@/components/Category";
import Container from "@/components/Container";
import EmptyList from "@/components/lists/EmptyList";
import ListCard from "@/components/lists/ListCard";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings();
  return (
    <section>
      <Category />
      <Container>
        {listings.length ? (
          <div className="grid grid-cols-1 gap-8 pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listings.map((listing: any) => (
              <ListCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            ))}
          </div>
        ) : (
          <EmptyList showReset />
        )}
      </Container>
    </section>
  );
}
