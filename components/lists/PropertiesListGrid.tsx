"use client";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/types";
import ListCard from "./ListCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export default function PropertiesListGrid({ listings, currentUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property deleted!");
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
      {listings.map((listing: Listing) => (
        <ListCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
          actionId={listing.id}
          actionLabel="Delete property"
          onAction={onDelete}
          disabled={deletingId === listing.id}
        />
      ))}
    </div>
  );
}
