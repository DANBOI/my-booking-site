"use client";

import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";

import useSearchModal from "@/hooks/useSearchModal";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import InfoCounter from "../inputs/InfoCounter";
import Heading from "../Heading";
import Modal from "./Modal";

type Props = {};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const inialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export default function SearchModal({}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);

  const isInitialSetp = step === STEPS.LOCATION;
  const isFinalSetp = step === STEPS.INFO;

  const { handleSubmit, setValue, watch, reset } = useForm<FieldValues>({
    defaultValues: {
      location: null,
      dateRange: inialDateRange,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
    },
  });

  //watching changed values from inputs
  const location = watch("location");
  const dateRange = watch("dateRange");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  //dynamic import map resouces when location changes
  const CountryMap = useMemo(
    () =>
      dynamic(() => import("../CountryMap"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  //set value for custom non-form components
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (!isFinalSetp) return setStep(step + 1);

    const queryInfo = {
      category: params.get("category"),
      locationValue: location?.value,
      startDate: formatISO(dateRange?.startDate),
      endDate: formatISO(dateRange?.endDate),
      guestCount,
      roomCount,
      bathroomCount,
    };

    //create query string
    const queryStr = Object.entries(queryInfo)
      .map(([key, value]) => value && `${key}=${value}`)
      .filter((e) => e)
      .join("&");

    //initialize
    reset();
    setStep(STEPS.LOCATION);
    searchModal.onClose();

    //redirect
    router.push(`/?${queryStr}`);
  };

  /*switch body content based on steps */

  let bodyContent = <div>PLACE HOLDER</div>;
  switch (step) {
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where are you planning to go?"
            subtitle="choose a country"
          />
          <CountrySelect
            value={location}
            onChange={(country) => setCustomValue("location", country)}
          />
          <CountryMap center={location?.latlng} />
        </div>
      );
      break;

    case STEPS.DATE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="When do you want to go?" subtitle="pick a date!" />
          <Calendar
            value={dateRange}
            onChange={(value) => setCustomValue("dateRange", value.selection)}
          />
        </div>
      );
      break;

    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="provide more infomations"
            subtitle="find the right place for you"
          />
          <InfoCounter
            title="Guests"
            subtitle="How many people in your group?"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr />
          <InfoCounter
            title="Rooms"
            subtitle="How many rooms do you need?"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <hr />
          <InfoCounter
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Search terms"
      actionLabel={isFinalSetp ? "Search" : "Next"}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel="Back"
      secondaryAction={isInitialSetp ? undefined : () => setStep(step - 1)}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}
