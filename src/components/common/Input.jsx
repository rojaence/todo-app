import { forwardRef } from "react";
import "@/styles/input.scss";

const Input = forwardRef(function (
  {
    type = "text",
    hint = "",
    value = "",
    disabled = false,
    onChange = () => {},
    customStyle={}
  },
  ref
) {
  return (
    <input
      className="input"
      style={customStyle}
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
