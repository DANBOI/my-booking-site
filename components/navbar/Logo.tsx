"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        alt="logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/next.svg"
      />
    </Link>
  );
}
