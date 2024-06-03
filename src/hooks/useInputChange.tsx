import { useState } from "react";

const useInputChange = () => {
  let [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setInputValue(value);
    }
  };
  const resetInputValue = () => {
    setInputValue("");
  };
  return { inputValue, handleInputChange, resetInputValue };
};

export default useInputChange;
