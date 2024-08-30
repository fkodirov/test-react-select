export type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  subtitle?: string | number;
};

export type SelectProps = {
  options: Option[];
  value: Option | Option[];
  onChange: (value: Option | Option[]) => void;
  mode?: "single" | "multiple";
  placeholder?: string;
  customDropdown?: (
    options: Option[],
    selected: Option | Option[],
    onOptionClick: (option: Option) => void
  ) => React.ReactNode;
  // customDropdown?: boolean;
  customLabel?: (
    value: Option | Option[],
    options: Option[],
    handleOptionClick: (option: Option) => void,
    placeholder: string
  ) => React.ReactNode;
  searchEnabled?: boolean;
  allowCreateOption?: boolean;
  onCreateOption?: ({
    inputLabel,
    inputValue,
  }: {
    inputLabel: string;
    inputValue: string | number;
  }) => void;
  error?: boolean;
  disabled?: boolean;
};

import React, { useState } from "react";
import classNames from "classnames";
import ArrowDownIcon from "../../assets/icons/arrow-down.svg?react";
import ArrowUpIcon from "../../assets/icons/arrow-up.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import styles from "./Select.module.scss";

const DropdownSelect: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  mode = "single",
  placeholder = "Select...",
  customDropdown,
  customLabel,
  searchEnabled = true,
  allowCreateOption = false,
  onCreateOption,
  error,
  disabled,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleOptionClick = (option: Option) => {
    if (mode === "single") {
      onChange(option);
      setSearchValue(option.label);
      setDropdownOpen(false);
    } else if (Array.isArray(value)) {
      const selectedValues = [...value];
      if (selectedValues.includes(option)) {
        onChange(selectedValues.filter((val) => val !== option));
      } else {
        onChange([...selectedValues, option]);
      }
    } else {
      onChange([option]);
    }
  };

  const handleAddOption = () => {
    // Check if the label already exists
    if (options.some((option) => option.label === newLabel)) {
      alert("Option with this label already exists.");
      return;
    }

    const newOption = { inputLabel: newLabel, inputValue: newValue };

    if (onCreateOption) onCreateOption(newOption); // If onCreateOption exists, call it

    setSearchValue(""); // Set search value to newly added option label
    setNewLabel("");
    setNewValue("");
    setDropdownOpen(true); // Close the dropdown after adding
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderSelected = () => {
    if (customLabel) {
      return customLabel(value, options, handleOptionClick, placeholder);
    }
    if (Array.isArray(value)) {
      return value.map((val) => {
        const selectedOption = options.find((option) => option === val);
        return (
          <div key={val.value} className={styles.selectedOption}>
            {/* {selectedOption?.icon && (
              <span className={styles.selectedOptionIcon}>
                {selectedOption.icon}
              </span>
            )} */}
            <span className={styles.selectedLabel}>
              {selectedOption?.label}
            </span>
            <span
              className={styles.crossIcon}
              onClick={(e) => {
                e.stopPropagation(); 
                handleOptionClick(selectedOption!); 
              }}
            >
              <CrossIcon />
            </span>
          </div>
        );
      });
    }
    const selectedOption = options.find((option) => option === value);
    return selectedOption?.label || placeholder;
  };

  return (
    <div style={{ position: "relative", width: "292px" }}>
      <div
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        className={classNames(
          styles.inputDiv,
          { [styles.error]: error },
          { [styles.disabled]: disabled }
        )}
        style={
          dropdownOpen
            ? { boxShadow: "0px 0px 0px 3px rgba(113, 48, 142, 0.12)" }
            : {}
        }
      >
        {mode === "multiple" && renderSelected()}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            if (!dropdownOpen) setDropdownOpen(true);
            setSearchValue(e.target.value);
            setNewLabel(e.target.value);
          }}
          placeholder={placeholder}
          style={{ flex: 1, border: "none", outline: "none" }}
          disabled={disabled}
        />
        <span>{!dropdownOpen ? <ArrowDownIcon /> : <ArrowUpIcon />}</span>
      </div>
      {dropdownOpen && (
        <div
          className={styles.optionsList}
          style={{
            minHeight:
              searchEnabled && filteredOptions.length === 0
                ? "auto"
                : "",
            height:
              searchEnabled && filteredOptions.length === 0
                ? "auto"
                : "",
          }}
        >
          {searchEnabled &&
            filteredOptions.length > 0 &&
            (customDropdown
              ? customDropdown(options, value, handleOptionClick)
              : filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() =>
                      !option.disabled && handleOptionClick(option)
                    }
                    className={styles.option}
                    style={{
                      cursor: option.disabled ? "not-allowed" : "pointer",
                      // backgroundColor: Array.isArray(value) ? value.includes(option.value) ? '#e6f7ff' : 'transparent' : option.value === value ? '#e6f7ff' : 'transparent',
                      // color: Array.isArray(value) ? value.includes(option.value) ? '#1890ff' : '#000' : option.value === value ? '#1890ff' : '#000',
                    }}
                  >
                    <div className={option.subtitle ? styles.optionBlock : ""}>
                      <span>{option.label}</span>
                      {option.subtitle && (
                        <span className={styles.subtitle}>
                          {option.subtitle}
                        </span>
                      )}
                    </div>
                    {/* {Array.isArray(value) && value.includes(option.value) && <span>✔</span>} */}
                    {Array.isArray(value)
                      ? value.includes(option) && (
                          <span className={styles.checkIcon}>
                            <CheckIcon />
                          </span>
                        )
                      : option === value && (
                          <span className={styles.checkIcon}>
                            <CheckIcon />
                          </span>
                        )}
                  </div>
                )))}
          {searchEnabled &&
            filteredOptions.length === 0 &&
            allowCreateOption ? (
              <button onClick={handleAddOption} className={styles.addBtn}>
                <PlusIcon />{" "}
                <span className={styles.addBtnText}>
                  Создать "{searchValue}"
                </span>
              </button>
            ): <div>Nothing found</div>}
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
