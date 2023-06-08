"use client";

import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";

import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useMemo, useState } from "react";

export default function Search() {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getCountryByValue } = useCountries();

  const locationLabel = useMemo(() => {
    const locationValue = params.get("locationValue") || "";
    return getCountryByValue(locationValue)?.label || "Any Where";
  }, [getCountryByValue, params]);

  const durationLabel = useMemo(() => {
    const startDate = params.get("startDate") || "";
    const endDate = params.get("endDate") || "";
    const dayCount =
      differenceInDays(new Date(endDate), new Date(startDate)) || 1;
    return startDate && endDate ? `${dayCount} Days` : "Any Time";
  }, [params]);

  const guestLabel = useMemo(() => {
    const guestCount = params.get("guestCount");
    return `${guestCount || "Any"} Guests`;
  }, [params]);

  const TextStyle = (label: string) =>
    label.startsWith("Any") ? "" : "text-primary";

  return (
    <div
      onClick={searchModal.onOpen}
      className="flex_center w-full cursor-pointer whitespace-nowrap rounded-full border py-2 text-sm font-semibold shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className={`px-6 ${TextStyle(locationLabel)}`}>{locationLabel}</div>
      <div
        className={`hidden flex-1 border-x px-6 text-center sm:block ${TextStyle(
          durationLabel
        )}`}
      >
        {durationLabel}
      </div>
      <div className="flex items-center gap-3 pl-6 pr-2 ">
        <div className={`hidden sm:block ${TextStyle(guestLabel)}`}>
          {guestLabel}
        </div>
        <div className="rounded-full bg-primary p-2 text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
}
