"use client";

import { Reservation } from "@prisma/client";
import { SafeUser } from "@/types";
import ListCard from "./ListCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  reservations: Reservation[];
  currentUser?: SafeUser | null;
};

export default function ReservationsListGrid({
  reservations,
  currentUser,
}: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <div className="list_grid">
      {reservations.map((reservation: any) => (
        <ListCard
          currentUser={currentUser}
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          actionLabel="Cancel guest reservation"
          onAction={onCancel}
          disabled={deletingId === reservation.id}
        />
      ))}
    </div>
  );
}
