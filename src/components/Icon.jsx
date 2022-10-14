import { Fragment } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "@/components/icons/SunIcon";
import AddIcon from "@/components/icons/AddIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import DotIcon from "@/components/icons/DotIcon";
import AlertOutlineIcon from "@/components/icons/AlertOutlineIcon"
import CheckOutlineIcon from "@/components/icons/CheckOutlineIcon"
import HelpOutlineIcon from "@/components/icons/HelpOutlineIcon";
import CloseOutlineIcon from "@/components/icons/CloseOutlineIcon"
import "@/styles/icon.scss";

function Icon({ name = "moon", size = 48 }) {
  const icons = {
    moon: <MoonIcon size={size} />,
    sun: <SunIcon size={size} />,
    add: <AddIcon size={size} />,
    check: <CheckIcon size={size} />,
    close: <CloseIcon size={size} />,
    dot: <DotIcon size={size} />,
    'alert-outline': <AlertOutlineIcon size={size}/>,
    'check-outline': <CheckOutlineIcon size={size}/>,
    'help-outline': <HelpOutlineIcon size={size}/>,
    'close-outline': <CloseOutlineIcon size={size}/>,
  };

  return <Fragment>{icons[name]}</Fragment>;
}

export default Icon;
