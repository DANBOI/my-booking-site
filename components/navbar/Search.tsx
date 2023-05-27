"use client";

import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <div className="flex_center w-full cursor-pointer rounded-full border py-2 text-sm font-semibold shadow-sm transition hover:shadow-md md:w-auto">
      <div className="px-6 ">locationLabel</div>
      <div className="hidden flex-1 border-x px-6 sm:block">durationLabel</div>
      <div className="flex items-center gap-3 pl-6 pr-2 ">
        <div className="hidden sm:block">guestLabel</div>
        <div className="rounded-full bg-primary p-2 text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
}
