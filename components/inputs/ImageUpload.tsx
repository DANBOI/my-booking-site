"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}
//unsigned cloudinary preset
const uploadPreset = "qu0lmgdg";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ImageUpload({ value, onChange }: Props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className=" flex_center relative cursor-pointer flex-col gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
        >
          <TbPhotoPlus size={50} />
          <div className="text-lg font-semibold">Click to upload</div>
          {/* add image preview after successfully uploaded the image */}
          {value && (
            <div className="absolute inset-0">
              <Image
                fill
                style={{ objectFit: "cover" }}
                src={value}
                alt="House"
              />
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}
