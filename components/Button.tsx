"use client";

import { IconType } from "react-icons";

type Props = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

export default function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70
        ${
          outline
            ? "border-black bg-white text-black"
            : "border-primary bg-primary text-white"
        }
        ${
          small
            ? "border py-1 text-sm font-light"
            : "text-md border-2 py-3 font-semibold"
        }`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
}
