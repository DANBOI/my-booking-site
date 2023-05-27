"use client";

import Link from "next/link";

type Props = { label: string; href?: string; clickHandler?: () => void };

export default function MenuItem({ href = "/", label, clickHandler }: Props) {
  return (
    <Link
      href={href}
      onClick={clickHandler}
      className="whitespace-nowrap border-l-2 border-primary px-4 py-3 font-semibold transition hover:bg-secondary"
    >
      {label}
    </Link>
  );
}
