"use client";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import ListCard from "./ListCard";
import axios from "axios";
import useFavorites from "@/hooks/useFavorites";

type Props = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export default function ListGrid({ listings, currentUser }: Props) {
  const { favoriteIds, setfavoriteIds } = useFavorites();

  useEffect(() => {
    if (currentUser?.favoriteIds) setfavoriteIds(currentUser?.favoriteIds);
  }, [currentUser?.favoriteIds, setfavoriteIds]);
  // const [favoriteIds, setfavoriteIds] = useState(
  //   currentUser?.favoriteIds || []
  // );

  return (
    <div className="list_grid">
      {listings.map((listing: Listing) => (
        <ListCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
          favoriteIds={favoriteIds}
          setfavoriteIds={setfavoriteIds}
        />
      ))}
    </div>
  );
}
