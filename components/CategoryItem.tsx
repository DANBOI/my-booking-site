"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

export default function CategoryItem({ icon: Icon, label, selected }: Props) {
  // const currentUrl = window.location.href;
  const params = useSearchParams();

  /* url patterns
  /
  /?category=kitchen
  /?category=kitchen&date=2022-01-01
  /?location=abc
  /?location=abc&date=2022-01-01
  /?location=abc&date=2022-01-01&category=kitchen
  */
  const nextUrl = useMemo(() => {
    //arrange current params
    const queryInfo: any = {};
    params.forEach((value, key) => {
      queryInfo[key] = key.endsWith("Date") ? encodeURIComponent(value) : value;
    });

    //add/update or delete category based on selection
    queryInfo.category = selected ? undefined : label;

    //create query string
    const queryStr = Object.entries(queryInfo)
      .map(([key, value]) => value && `${key}=${value}`)
      .filter((e) => e)
      .join("&");

    return `/?${queryStr}`;
  }, [label, params, selected]);

  return (
    <Link
      //   onClick={handleClick}
      href={nextUrl}
      className={`flex flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-primary ${
        selected
          ? "border-b-primary text-primary"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <p className="text-sm font-medium">{label}</p>
    </Link>
  );
}
