"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { SafeUser } from "@/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";

const CountryMap = dynamic(() => import("../CountryMap"), {
  ssr: false,
});

type Props = {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category?: {
    icon: IconType;
    label: string;
    description: string;
  };
  location?: {
    value: string;
    label: string;
    flag: string;
    latlng: [number, number];
    region: string;
  };
};

export default function ListingInfo({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  location,
}: Props) {
  {
    return (
      <>
        <div className="flex flex-col gap-2">
          <div className=" flex items-center gap-2 text-xl font-semibold">
            <p>Hosted by {user?.name}</p>
            <Avatar src={user?.image} />
          </div>
          <div className="flex items-center gap-4 font-light text-neutral-500">
            <div>{guestCount} guests</div>
            <div>{roomCount} rooms</div>
            <div>{bathroomCount} bathrooms</div>
          </div>
        </div>
        <hr />
        {category && (
          <ListingCategory
            icon={category.icon}
            label={category?.label}
            description={category?.description}
          />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">{description}</div>
        <hr />
        <CountryMap center={location?.latlng} />
      </>
    );
  }
}
