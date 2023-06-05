"use client";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/types";
import ListCard from "./ListCard";

type Props = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export default function FavoritesListGrid({ listings, currentUser }: Props) {
  return (
    <div className="list_grid">
      {listings.map((listing: Listing) => (
        <ListCard currentUser={currentUser} key={listing.id} data={listing} />
      ))}
    </div>
  );
}
