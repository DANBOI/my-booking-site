"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

import useRentModal from "@/hooks/useRentModal";
import useCategories from "@/hooks/useCategories";

import CategorySelect from "../inputs/CategorySelect";
import CountrySelect from "../inputs/CountrySelect";
import InfoCounter from "../inputs/InfoCounter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
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
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const isInitialSetp = step === STEPS.CATEGORY;
  const isFinalSetp = step === STEPS.PRICE;

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
      location: null, //obj
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      title: "",
      description: "",
      price: 1,
    },
  });

  //watching changed values from inputs
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!isFinalSetp) return setStep(step + 1);
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh(); //update home page
        reset(); //form values reset
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((err) => {
        // alert(err.toString());
        toast.error(`Something went wrong`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /*switch body content based on steps */

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

    case STEPS.DESCRIPTION:
      bodyContent = (
        <div className="flex flex-col gap-8 ">
          <Heading
            title="Add a description of your home"
            subtitle="Add a short description of your home looks like!"
          />
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
      break;

    case STEPS.PRICE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Set your price" subtitle="How much for one night?" />
          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
      actionLabel={isFinalSetp ? "Submit" : "Next"}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel="Back"
      secondaryAction={isInitialSetp ? undefined : () => setStep(step - 1)}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}
