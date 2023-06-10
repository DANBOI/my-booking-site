"use client";

import Image from "next/image";
import { SafeUser } from "@/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

type Props = {
  title: string;
  location?: {
    value: string;
    label: string;
    flag: string;
    latlng: [number, number];
    region: string;
  };
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
};

export default function ListingHero({
  title,
  location,
  imageSrc,
  id,
  currentUser,
}: Props) {
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative mt-1 h-[60vh] overflow-hidden rounded-xl">
        <Image src={imageSrc} fill className="object-cover" alt="Image" />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
