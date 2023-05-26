"use client";

import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <div className="border w-full  md:w-auto py-2 rounded-full  shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex_center">
        <div className="text-sm font-semibold px-6">locationLabel</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          durationLabel
        </div>
        <div className="text-sm pl-6 pr-2 text-secondary flex items-center gap-3">
          <div className="hidden sm:block">guestLabel</div>
          <div className=" p-2 bg-primary rounded-full  text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
