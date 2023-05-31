"use client";

import Select from "react-select";

import useCountries from "@/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAllCountries } = useCountries();
  const countries = getAllCountries();

  // customize the select options's styles
  const formattedLabel = (option: any) => (
    <div className="flex items-center gap-3">
      <div>{option.flag}</div>
      <div>
        {option.label},
        <span className="ml-1 text-neutral-500">{option.region}</span>
      </div>
    </div>
  );

  return (
    <Select
      placeholder="- Select a country,continent-"
      isClearable
      options={countries}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={formattedLabel}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "#14b8a6",
          primary25: "#f5f5f5",
        },
      })}
    />
  );
};

export default CountrySelect;
