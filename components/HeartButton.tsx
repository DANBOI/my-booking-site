"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import useFavorites from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";

type Props = {
  // favoriteIds: string[];
  listingId: string;
  // setfavoriteIds: (array: string[]) => void;
};

export default function HeartButton({
  // favoriteIds,
  listingId,
}: // setfavoriteIds,
Props) {
  const router = useRouter();
  const { favoriteIds, setfavoriteIds } = useFavorites();
  const hasFavorited = favoriteIds.includes(listingId);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      //won't be linked to the listing detail page
      e.stopPropagation();

      const data = hasFavorited
        ? favoriteIds.filter((id) => id !== listingId)
        : [...favoriteIds, listingId];

      try {
        await axios.patch(`/api/users/favorites`, { favoriteIds: data });
        // setfavoriteIds(data);
        setfavoriteIds(data);
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [favoriteIds, hasFavorited, listingId, router, setfavoriteIds]
  );

  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer transition hover:scale-110 hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-primary" : "fill-neutral-500/70"}
      />
    </div>
  );
}
