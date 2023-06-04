"use client";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/types";
import React, { useEffect } from "react";
import ListCard from "./ListCard";
import useFavorites from "@/hooks/useFavorites";

type Props = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export default function HomeListGrid({ listings, currentUser }: Props) {
  const { setfavoriteIds } = useFavorites();

  useEffect(() => {
    setfavoriteIds(currentUser?.favoriteIds || []);
  }, [currentUser?.favoriteIds, setfavoriteIds]);

  return (
    <div className="list_grid">
      {listings.map((listing: Listing) => (
        <ListCard currentUser={currentUser} key={listing.id} data={listing} />
      ))}
    </div>
  );
}
