"use client";

import { useEffect } from "react";
import EmptyList from "@/components/lists/EmptyList";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyList
      title="Error occurred!"
      subtitle="It seems like something went wrong.\n Please try again later."
    />
  );
}
