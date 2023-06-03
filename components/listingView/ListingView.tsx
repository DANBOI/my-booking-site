"use client";

import { useState } from "react";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/types";
import useCategories from "@/hooks/useCategories";

import ListingHero from "./ListingHero";
import ListingInfo from "./ListingInfo";
import useCountries from "@/hooks/useCountries";

type Props = {
  listing: Listing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

export default function ListingView({ listing, currentUser }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCategoryByLabel } = useCategories();
  const { getCountryByValue } = useCountries();

  const {
    id,
    title,
    category,
    imageSrc,
    locationValue,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    user,
  } = listing;

  const categoryItem = getCategoryByLabel(category);
  const location = getCountryByValue(locationValue);

  return (
    <article className="mx-auto mt-8 max-w-screen-lg ">
      <div className="flex flex-col gap-6">
        <ListingHero
          title={title}
          imageSrc={imageSrc}
          location={location}
          id={id}
          currentUser={currentUser}
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            user={user}
            category={categoryItem}
            description={description}
            roomCount={roomCount}
            guestCount={guestCount}
            bathroomCount={bathroomCount}
            location={location}
          />
        </div>
      </div>
    </article>
  );
}
