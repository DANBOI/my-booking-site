"use client";

import Link from "next/link";
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
};

export default function ListCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  currentUser,
}: Props) {
  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(data.locationValue);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <Link href={`/listings/${data.id}`} className="group flex flex-col gap-2">
      <figure className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          fill
          className="object-cover transition group-hover:scale-110"
          src={data.imageSrc}
          alt="Listing"
        />
        <div className="absolute right-3 top-3">
          <HeartButton currentUser={currentUser} />
        </div>
      </figure>

      <div className="text-lg font-semibold">
        {location?.region}, {location?.label}
      </div>
      <div className="-mt-2 text-sm font-light text-neutral-500">
        {reservationDate || data.category}
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">$ {data.price}</div>
        {!reservation && <div className="font-light">???</div>}
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
  );
}
