"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/hooks/useCountries";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "@/types";

import HeartButton from "../HeartButton";
import Button from "../Button";

type Props = {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  favoriteIds?: string[];
  setfavoriteIds?: (array: string[]) => void;
};

export default function ListCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  currentUser,
  favoriteIds,
  setfavoriteIds,
}: Props) {
  const { getCountryByValue } = useCountries();
  // const router = useRouter();
  const location = getCountryByValue(data.locationValue);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div className="group relative">
      {currentUser && favoriteIds && setfavoriteIds && (
        <div className="absolute right-3 top-3 z-20">
          <HeartButton
            listingId={data.id}
            // favoriteIds={favoriteIds}
            // setfavoriteIds={setfavoriteIds}
          />
        </div>
      )}
      <Link
        href={`/listings/${data.id}`}
        // onClick={() => router.push(`/listings/${data.id}`)}
        className=" flex flex-col gap-2"
      >
        <figure className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover transition group-hover:scale-110"
            src={data.imageSrc}
            alt="Listing"
          />
        </figure>

        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>
        <div className="-mt-2 text-sm font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {data.price}</div>
          {!reservation && <div className="text-sm font-light"> / night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={() => {}}
          />
        )}
      </Link>
    </div>
  );
}
