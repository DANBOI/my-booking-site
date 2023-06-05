import getCurrentUser from "@/utils/getCurrentUser";
import { getListingsByUserId } from "@/utils/getListings";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import PropertiesListGrid from "@/components/lists/PropertiesListGrid";
import EmptyList from "@/components/lists/EmptyList";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  const listings = await getListingsByUserId(currentUser?.id);

  return (
    <section className="py-8">
      {listings?.length ? (
        <Container>
          <Heading title="Properties" subtitle="Your Properties for rent" />
          <PropertiesListGrid currentUser={currentUser} listings={listings} />
        </Container>
      ) : (
        <EmptyList
          title="No properties found"
          subtitle="You have no registerd properties."
        />
      )}
    </section>
  );
}
