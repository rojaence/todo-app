import { useState } from "react";

export const useAlert = (initialValue = false, initialConfig = {}) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const [config, setConfig] = useState(initialConfig);

  const openAlert = (newConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
  };

  const closeAlert = () => setIsOpen(false);

  return {isOpen, openAlert, closeAlert, config};
};
