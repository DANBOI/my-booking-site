"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/hooks/useRentModal";
import Heading from "../Heading";
import { FieldValues, useForm } from "react-hook-form";
import { categories } from "../Category";
import CategorySelect from "../inputs/CategorySelect";

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
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const bodyContent = (
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Rent your home!"
      actionLabel="Next"
      onSubmit={() => {}}
      secondaryActionLabel="Back"
      secondaryAction={
        step > STEPS.CATEGORY ? () => setStep(step - 1) : undefined
      }
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
}
