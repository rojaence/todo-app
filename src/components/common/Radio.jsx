import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import "../../styles/radio.scss";

function Radio({
  icon = "dot",
  iconSize = 48,
  autoHideIcon = false,
  customActiveStyle = {},
  checked = false,
  onChange = () => {},
}) {
  const checkboxRef = useRef(null);

  useEffect(() => {
    checked
      ? checkboxRef.current.setAttribute("checked", "completed")
      : checkboxRef.current.removeAttribute("checked");
  }, [checked]);

  return (
    <label className="radio" onClick={onChange}>
      <input
        className="radio__input"
        ref={checkboxRef}
        type="checkbox"
      />
      <span className="radio__checkmark">
        <Icon name={icon} size={iconSize} />
      </span>
    </label>
  );
}

export default Radio;
