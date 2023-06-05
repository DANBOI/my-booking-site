import getCurrentUser from "@/utils/getCurrentUser";
import getReservations from "@/utils/getReservations";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ReservationsListGrid from "@/components/lists/ReservationsListGrid";
import EmptyList from "@/components/lists/EmptyList";

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  return (
    <section className="py-8">
      {reservations.length ? (
        <Container>
          <Heading
            title="Reservations"
            subtitle="The bookings on your properties"
          />
          <ReservationsListGrid
            currentUser={currentUser}
            reservations={reservations}
          />
        </Container>
      ) : (
        <EmptyList
          title="No reservations found"
          subtitle="You have no reservations on your properties."
        />
      )}
    </section>
  );
}
