"use client";

import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

export default function CategorySelect({
  icon: Icon,
  label,
  selected,
  onClick,
}: Props) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex_center cursor-pointer gap-3 rounded-xl border-2 p-4 transition hover:border-primary ${
        selected ? "border-primary" : "border-neutral-200"
      }
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}
