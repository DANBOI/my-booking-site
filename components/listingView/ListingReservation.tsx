"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

type Props = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

export default function ListingReservation({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: Props) {
  return (
    <div className="divide-y overflow-hidden rounded-xl border border-neutral-200">
      <p className="p-4 text-2xl font-semibold">
        $ {price}
        <span className="text-lg font-light text-neutral-600"> / night</span>
      </p>
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="flex items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
}
