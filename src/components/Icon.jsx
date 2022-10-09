import { Fragment } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import AddIcon from "./icons/AddIcon";
import CheckIcon from "./icons/CheckIcon";
import CloseIcon from "./icons/CloseIcon";
import DotIcon from "./icons/DotIcon";
import AlertOutlineIcon from "./icons/AlertOutlineIcon"
import CheckOutlineIcon from "./icons/CheckOutlineIcon"
import HelpOutlineIcon from "./icons/HelpOutlineIcon";
import CloseOutlineIcon from "./icons/CloseOutlineIcon"
import "../styles/icon.scss";

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
