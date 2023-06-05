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
};

export default function ListCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: Props) {
  const { getCountryByValue } = useCountries();
  // const router = useRouter();
  const location = getCountryByValue(data.locationValue);

  const handleAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onAction?.(actionId);
    },
    [onAction, actionId]
  );

  //format reservation date
  const reservationDate = useMemo(() => {
    if (!reservation) return;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div className="group relative rounded-xl shadow-sm">
      {currentUser && (
        <div className="absolute right-3 top-3 z-20">
          <HeartButton listingId={data.id} />
        </div>
      )}
      <Link
        href={`/listings/${data.id}`}
        // onClick={() => router.push(`/listings/${data.id}`)}
        className="mb-3 flex flex-col gap-2"
      >
        <figure className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            fill
            className="object-cover transition group-hover:scale-110"
            src={data.imageSrc}
            alt="Listing"
          />
        </figure>
        <div className="space-y-2 px-2">
          <p className="text-lg font-semibold">
            {location?.region}, {location?.label}
          </p>
          <p className="text-sm font-light text-neutral-500">
            {reservationDate || data.category}
          </p>
          <p className="font-semibold">
            $ {reservation?.totalPrice || data.price}
            {!reservation && (
              <span className="text-sm font-light"> / night</span>
            )}
          </p>
        </div>
      </Link>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleAction}
        />
      )}
    </div>
  );
}
