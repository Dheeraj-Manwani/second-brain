"use client";

import { forwardRef, Ref, useState } from "react";
import AsyncSelect from "react-select/async";
import { FormPostErrors } from "./form/form-errors";
import { twMerge } from "tailwind-merge";
import { v4 as uuid } from "uuid";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#f5f5f5", // Light grey background
    border: "none", // Black border on focus
    borderRadius: "8px", // Rounded corners
    padding: "3px 8px", // Adjust padding for spacing
    height: "35px", // Standard height
    boxShadow: state.isFocused ? "0 0 0 2px black" : "none", // Optional: Black focus ring
    fontSize: "14px", // Smaller text in the input
  }),

  placeholder: (provided: any) => ({
    ...provided,
    color: "#9e9e9e", // Lighter grey placeholder text
    fontSize: "14px", // Smaller placeholder text
    border: "none", // Black border on focus
  }),

  singleValue: (provided: any) => ({
    ...provided,
    fontSize: "14px", // Smaller font for selected value
    color: "#333", // Dark text for selected value
    border: "none", // Black border on focus
  }),

  menu: (provided: any) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle dropdown shadow
    border: "none", // Black border on focus
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0e0e0" : "white",
    color: "#333",
    fontSize: "14px", // Reduced font size
    padding: "8px 10px", // Reduced padding for a compact look
    border: "none", // Black border on focus
  }),
};

type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  id: string;
  key?: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  options: DropdownOption[];
  defaultValue?: DropdownOption;
  errors?: Record<string, string[] | undefined>;
  getOptionsAsync?: (filter?: string) => Promise<DropdownOption[]>;
  className?: string;
}

export const Dropdown = forwardRef<any, DropdownProps>(
  (
    {
      id,
      key,
      label,
      disabled = false,
      placeholder,
      options,
      defaultValue,
      errors,
      getOptionsAsync,
      className,
    },
    ref
  ) => {
    const [option, setOption] = useState<DropdownOption | {}>(
      defaultValue || {}
    );
    const loadOptions = async (filter: string) => {
      try {
        if (options && options.length > 0) {
          return options.filter((optn) =>
            optn.label.toLowerCase().includes(filter.toLowerCase())
          );
        }
        if (!getOptionsAsync) return [];

        const data = await getOptionsAsync(filter);
        return data;
      } catch (e) {
        console.log("Error occured in dropdown", e);
        return [];
      }
    };

    return (
      <div className={twMerge("flex flex-col", className)} key={key}>
        <h3 className="text-sm font-semibold text-neutral-500 p-0">{label}</h3>
        <AsyncSelect
          id={id}
          name={id}
          ref={ref}
          key={key || uuid()}
          isDisabled={disabled}
          placeholder={placeholder}
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          defaultValue={option}
          onChange={(obj) => setOption(obj as DropdownOption)}
          isClearable={true}
          styles={customStyles}
          className="border-none"
        />
        <FormPostErrors id={id} errors={errors} />
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
