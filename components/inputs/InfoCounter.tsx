import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type Props = {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
};

export default function InfoCounter({
  title,
  subtitle,
  value,
  onChange,
}: Props) {
  const isChanged = value > 1;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={() => isChanged && onChange(value - 1)}
          className="counter_button"
        >
          <AiOutlineMinus />
        </div>
        <div
          className={`select-none text-xl font-light ${
            isChanged ? "text-primary" : " text-neutral-600"
          }`}
        >
          {value}
        </div>
        <div onClick={() => onChange(value + 1)} className="counter_button">
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}
