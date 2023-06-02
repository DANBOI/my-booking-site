"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
// import { getSession, useSession } from "next-auth/react";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export default function HeartButton({ listingId, currentUser }: Props) {
  const router = useRouter();
  // const { data: session } = useSession();
  // console.log(session?.user);
  // let favoriteIds = currentUser?.favoriteIds || [];

  const [favoriteIds, setfavoriteIds] = useState(
    currentUser?.favoriteIds || []
  );
  const [hasFavorited, setHasFavorited] = useState(
    favoriteIds.includes(listingId)
  );

  // let hasFavorited =  currentUser?.favoriteIds?.includes(listingId);

  // const hasFavorited = useMemo(
  //   () => currentUser?.favoriteIds?.includes(listingId),
  //   [currentUser, listingId]
  // );
  // console.log(favoriteIds);
  // console.log(hasFavorited);

  // const toggleFavorite = useCallback(
  //   async (e: React.MouseEvent<HTMLDivElement>) => {
  //     //won't be linked to the listing detail page
  //     e.stopPropagation();

  //     const data = hasFavorited
  //       ? favoriteIds.filter((id) => id !== listingId)
  //       : [...favoriteIds, listingId];

  //     try {
  //       await axios.patch(`/api/users/favorites`, { favoriteIds: data });
  //       setfavoriteIds(data);
  //       setHasFavorited(!hasFavorited);
  //       // router.refresh();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [currentUser, hasFavorited, listingId]
  // );

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    //won't be linked to the listing detail page
    e.stopPropagation();

    const data = hasFavorited
      ? favoriteIds.filter((id) => id !== listingId)
      : [...favoriteIds, listingId];

    try {
      await axios.patch(`/api/users/favorites`, { favoriteIds: data });
      setfavoriteIds(data);
      setHasFavorited(!hasFavorited);
      // router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer transition hover:scale-110 hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className=" absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-primary" : "fill-neutral-500/70"}
      />
    </div>
  );
}
