import { forwardRef, Ref } from "react";
import AsyncSelect from "react-select/async";
import { FormPostErrors } from "./form/form-errors";

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

interface DropdownProps {
  id: string;
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValue?: { label: string; value: string };
  errors?: Record<string, string[] | undefined>;
  getOptionsAsync?: (
    filter?: string
  ) => Promise<{ label: string; value: string }[]>;
}

export const Dropdown = forwardRef<any, DropdownProps>(
  (
    { id, label, placeholder, options, defaultValue, errors, getOptionsAsync },
    ref
  ) => {
    const loadOptions = async (filter: string) => {
      try {
        if (options && options.length > 0)
          return options.filter((optn) =>
            optn.label.toLowerCase().includes(filter.toLowerCase())
          );
        if (!getOptionsAsync) return [];

        const data = await getOptionsAsync(filter);
        return data;
      } catch (e) {
        console.log("Error occured in dropdown", e);
        return [];
      }
    };

    return (
      <div className="flex flex-col w-1/2 gap-1">
        <h3 className="text-sm font-semibold text-neutral-500">{label}</h3>
        {/* <select
          className="flex h-9 w-full  border border-input py-1  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:ring-none rounded-lg border-none bg-primary/5 px-4 text-base focus:outline-none"
          id={id}
          name={id}
          ref={ref}
          // defaultValue={defaultValue ? defaultValue : options[0]?.value}
        >
          {options.map((optn) => (
            <option value={optn.value}>{optn.label}</option>
          ))}
        </select> */}
        <AsyncSelect
          id={id}
          name={id}
          ref={ref}
          placeholder={placeholder}
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          defaultValue={defaultValue}
          styles={customStyles}
          className="border-none"
        />
        <FormPostErrors id={id} errors={errors} />
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
