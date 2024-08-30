import "./App.scss";
import React, { useState } from "react";
import Select from "./components/Select/Select";
import { Option } from "./components/Select/Select";
// import AaIcon from './assets/icons/aa.svg?react';
import AvatarIcon from "./assets/icons/avatar.svg?react";
import CustomDropdown from "./components/CustomDropdown/CustomDropdown";
import SelectedOptions from "./components/SelectedOptions/SelectedOptions";

// import { ReactComponent as AaIcon } from '../assets/icons/aa.svg';

const options: Option[] = [
  { value: 1, label: "Option 1", icon: <AvatarIcon />, subtitle: "Subtitle" },
  { value: 2, label: "Option 2", icon: <AvatarIcon />, subtitle: "Subtitle" },
  { value: 3, label: "Option 3", icon: <AvatarIcon />, subtitle: "Subtitle" },
  { value: 4, label: "Option 4", icon: <AvatarIcon />, subtitle: "Subtitle" },
  { value: 5, label: "Option 5", icon: <AvatarIcon />, subtitle: "Subtitle" },
  { value: 6, label: "Option 6", icon: <AvatarIcon />, subtitle: "Subtitle" },
  { value: 7, label: "Option 7", icon: <AvatarIcon />, subtitle: "Subtitle" },
  { value: 8, label: "Option 8", icon: <AvatarIcon />, subtitle: "Subtitle" },
];

const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<Option | Option[]>([]);

  const handleCreateOption = ({
    inputLabel,
    inputValue,
  }: {
    inputLabel: string;
    inputValue: string | number;
  }) => {
    options.push({ label: inputLabel, value: inputValue });
  };

  return (
    <Select
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      mode="multiple"
      placeholder="Select an option"
      searchEnabled
      allowCreateOption
      onCreateOption={handleCreateOption}
      customLabel={(selectedValue, options, handleOptionClick) => (
        <SelectedOptions
          value={selectedValue}
          options={options}
          handleOptionClick={handleOptionClick}
        />
      )}
      customDropdown={(options, selected, onOptionClick) => (
        <CustomDropdown
          options={options}
          selected={selected}
          onOptionClick={onOptionClick}
        />
      )}
    />
  );
};

export default App;
