"use client";

import Image from "next/image";

type Props = {
  src?: string;
};

export default function Avatar({ src = "/placeholder.jpg" }: Props) {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src}
    />
  );
}
