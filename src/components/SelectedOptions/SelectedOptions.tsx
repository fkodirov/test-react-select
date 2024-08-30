import React from "react";
import CrossIcon from "../../assets/icons/cross.svg?react";
import styles from "./SelectedOptions.module.scss";
import { Option } from "../Select/Select";

type SelectedOptionsProps = {
  value: Option | Option[];
  options: Option[];
  handleOptionClick: (option: Option) => void;
};

const SelectedOptions: React.FC<SelectedOptionsProps> = ({
  value,
  options,
  handleOptionClick,
}) => {
  if (Array.isArray(value)) {
    return value.map((val) => {
      const selectedOption = options.find((option) => option === val);
      return (
        <div key={val.value} className={styles.selectedOption}>
          {selectedOption?.icon && (
            <span className={styles.selectedOptionIcon}>
              {selectedOption.icon}
            </span>
          )}
          <span className={styles.selectedLabel}>
            {selectedOption?.label}
          </span>
          <span
            className={styles.crossIcon}
            // style={{ marginLeft: '8px', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent dropdown toggle on delete
              handleOptionClick(selectedOption!); // Remove selected item
            }}
          >
            <CrossIcon />
          </span>
        </div>
      );
    });
  }
  const selectedOption = options.find((option) => option === value);
  return selectedOption?.label;
};

export default SelectedOptions;
