"use client";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/types";
import React, { useCallback, useState } from "react";
import ListCard from "./ListCard";
import axios from "axios";

type Props = {
  listings: Listing[];
  currentUser?: SafeUser | null;
};

export default function ListGrid({ listings, currentUser }: Props) {
  const [favoriteIds, setfavoriteIds] = useState(
    currentUser?.favoriteIds || []
  );

  return (
    <div className="list_grid">
      {listings.map((listing: any) => (
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
