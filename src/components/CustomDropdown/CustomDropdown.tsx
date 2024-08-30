import { Option } from "../Select/Select";
import styles from "./CustomDropdown.module.scss";
import CheckIcon from "../../assets/icons/check.svg?react";


interface CustomDropdownProps {
  options: Option[];
  selected: Option | Option[];
  onOptionClick: (option: Option) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selected,
  onOptionClick,
}) => {
  return (
    <>
      {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() =>
                      !option.disabled && onOptionClick(option)
                    }
                    className={styles.option}
                    style={{
                      cursor: option.disabled ? "not-allowed" : "pointer",
                      // backgroundColor: Array.isArray(value) ? value.includes(option.value) ? '#e6f7ff' : 'transparent' : option.value === value ? '#e6f7ff' : 'transparent',
                      // color: Array.isArray(value) ? value.includes(option.value) ? '#1890ff' : '#000' : option.value === value ? '#1890ff' : '#000',
                    }}
                  >
                    {option.icon && (
                      <>
                        {option.icon}
                        <div
                          className={option.subtitle ? styles.optionBlock : ""}
                        >
                          <span>{option.label}</span>
                          {option.subtitle && (
                            <span className={styles.subtitle}>
                              {option.subtitle}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                    {Array.isArray(selected)
                      ? selected.includes(option) && (
                          <span className={styles.checkIcon}>
                            <CheckIcon />
                          </span>
                        )
                      : option === selected && (
                          <span className={styles.checkIcon}>
                            <CheckIcon />
                          </span>
                        )}
                  </div>
                ))}
    </>
  );
};

export default CustomDropdown;