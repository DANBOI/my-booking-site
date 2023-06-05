import getCurrentUser from "@/utils/getCurrentUser";
import getReservations from "@/utils/getReservations";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import TripsListGrid from "@/components/lists/TripsListGrid";
import EmptyList from "@/components/lists/EmptyList";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });

  return (
    <section className="py-8">
      {reservations.length ? (
        <Container>
          <Heading title="Trips" subtitle="The places where you're going to" />
          <TripsListGrid
            currentUser={currentUser}
            reservations={reservations}
          />
        </Container>
      ) : (
        <EmptyList
          title="No trips found"
          subtitle="You have not reserved any trips."
        />
      )}
    </section>
  );
}
