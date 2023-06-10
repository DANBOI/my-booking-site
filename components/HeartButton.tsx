"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import useFavorites from "@/hooks/useFavorites";
import useLoginModal from "@/hooks/useLoginModal";
import { SafeUser } from "@/types";

type Props = {
  currentUser?: SafeUser | null;
  listingId: string;
};

export default function HeartButton({ currentUser, listingId }: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { favoriteIds, setfavoriteIds } = useFavorites();
  const hasFavorited = favoriteIds.includes(listingId);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      if (!currentUser) return loginModal.onOpen();
      //won't be linked to the listing detail page
      e.stopPropagation();

      const data = hasFavorited
        ? favoriteIds.filter((id) => id !== listingId)
        : [...favoriteIds, listingId];

      try {
        await axios.patch(`/api/users/favorites`, { favoriteIds: data });
        setfavoriteIds(data);
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    },
    [
      currentUser,
      favoriteIds,
      hasFavorited,
      listingId,
      loginModal,
      router,
      setfavoriteIds,
    ]
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
