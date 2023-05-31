"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useRentModal from "@/hooks/useRentModal";
import useCategories from "@/hooks/useCategories";
import CategorySelect from "../inputs/CategorySelect";
import CountrySelect from "../inputs/CountrySelect";
import InfoCounter from "../inputs/InfoCounter";
import ImageUpload from "../inputs/ImageUpload";
import Heading from "../Heading";
import Modal from "./Modal";
// import CountryMap from "../CountryMap";

type Props = {};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const rentModal = useRentModal();
  const { getAllCategories } = useCategories();
  const categories = getAllCategories();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

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

  //switch body content based on steps
  let bodyContent = <div>PLACE HOLDER</div>;
  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which category fits your home best?"
            subtitle="select a category"
          />
          <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategorySelect
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which country your home is in?"
            subtitle="select a country"
          />
          <CountrySelect
            value={location}
            onChange={(country) => setCustomValue("location", country)}
          />
          <CountryMap center={location?.latlng} />
        </div>
      );

      break;

    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="provide some infomations about your home"
            subtitle="change the numbers"
          />
          <InfoCounter
            title="Guests"
            subtitle="How many guests can be accommodated?"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr />
          <InfoCounter
            title="Rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <hr />
          <InfoCounter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      );
      break;

    case STEPS.IMAGES:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your home"
            subtitle="Show guests what your home looks like!"
          />
          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
      );
      break;

    default:
      break;
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Rent your home!"
      actionLabel="Next"
      onSubmit={() => setStep(step + 1)}
      secondaryActionLabel="Back"
      secondaryAction={
        step > STEPS.CATEGORY ? () => setStep(step - 1) : undefined
      }
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}
