import { forwardRef } from "react";
import "../../styles/input.scss";

const Input = forwardRef(function (
  {
    type = "text",
    hint = "",
    value = "",
    disabled = false,
    onChange = () => {},
  },
  ref
) {
  return (
    <input
      className="input"
      type={type}
      value={value}
      ref={ref}
      placeholder={hint}
      disabled={disabled}
      onChange={onChange}
    />
  );
});

export default Input;
