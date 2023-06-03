import getCurrentUser from "@/utils/getCurrentUser";
import { getListingById } from "@/utils/getListings";
import Container from "@/components/Container";
import EmptyList from "@/components/lists/EmptyList";
import ListingView from "@/components/listingView/ListingView";

type Props = {
  params: {
    listingId: string;
  };
};

export default async function ListingPage({ params: { listingId } }: Props) {
  // console.log(listingId);
  const listing = await getListingById(listingId);
  const currentUser = await getCurrentUser();

  return (
    <section>
      <Container>
        {listing ? (
          <ListingView listing={listing} currentUser={currentUser} />
        ) : (
          <EmptyList />
        )}
      </Container>
    </section>
  );
}
