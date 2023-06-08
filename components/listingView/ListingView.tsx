"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-toastify";
import axios from "axios";

import { Range } from "react-date-range";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/types";

import useCategories from "@/hooks/useCategories";
import useCountries from "@/hooks/useCountries";
import useLoginModal from "@/hooks/useLoginModal";
import useFavorites from "@/hooks/useFavorites";

import ListingHero from "./ListingHero";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  reservations?: Reservation[];
  listing: Listing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

export default function ListingView({
  reservations = [],
  listing,
  currentUser,
}: Props) {
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
    price,
    user,
  } = listing;

  const router = useRouter();
  const { favoriteIds, setfavoriteIds } = useFavorites();
  useEffect(() => {
    if (currentUser?.favoriteIds) setfavoriteIds(currentUser?.favoriteIds);
  }, [currentUser?.favoriteIds, setfavoriteIds]);

  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(price);

  const { getCategoryByLabel } = useCategories();
  const { getCountryByValue } = useCountries();

  const categoryItem = getCategoryByLabel(category);
  const location = getCountryByValue(locationValue);
  const { startDate, endDate } = dateRange;

  //the date range that couldn't be picked up
  const disabledDates = useMemo(
    () =>
      reservations.flatMap(({ startDate, endDate }) =>
        eachDayOfInterval({
          start: startDate,
          end: endDate,
        })
      ),
    [reservations]
  );

  //create reservation
  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate,
        endDate,
        listingId: listing?.id,
      })
      .then((res) => {
        // console.log(res);
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    endDate,
    listing?.id,
    loginModal,
    router,
    startDate,
    totalPrice,
  ]);

  //calculate total price
  useEffect(() => {
    if (startDate && endDate) {
      const dayCount = differenceInDays(endDate, startDate) || 1;
      setTotalPrice(dayCount * price);
    }
  }, [endDate, price, startDate]);

  return (
    <article className="mx-auto mt-8 max-w-screen-lg">
      <ListingHero
        title={title}
        imageSrc={imageSrc}
        location={location}
        id={id}
        currentUser={currentUser}
      />
      <div className="grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-7">
        <div className="md:order-last md:col-span-3">
          <ListingReservation
            price={price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
        <div className="space-y-5 md:col-span-4">
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
