"use client";

import Link from "next/link";
// import qs from 'query-string';
// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback, useState } from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

export default function CategoryItem({ icon: Icon, label, selected }: Props) {
  /* found a better way to toggle urls by using <Link>
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
      let currentQuery = {};

      if (params) {
          currentQuery = qs.parse(params.toString())
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label
      }

      if (params?.get('category') === label) {
        delete updatedQuery.category;
      }
      
      const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery
      }, { skipNull: true });

      router.push(url);
    }, [label, router, params]);
    */

  return (
    <Link
      //   onClick={handleClick}
      href={selected ? "/" : `/?category=${label}`}
      className={`flex flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <p className="text-sm font-medium">{label}</p>
    </Link>
  );
}
