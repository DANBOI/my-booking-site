"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/types";

type Props = {
  currentUser?: SafeUser | null;
};

export default function HeartButton({ currentUser }: Props) {
  const hasFavorited = true;
  return (
    <div
      onClick={() => {}}
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
