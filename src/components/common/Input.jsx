import "../../styles/input.scss";

function Input({
  type = "text",
  hint = "",
  value = "",
  disabled = false,
  onChange = () => {},
}) {
  return (
    <input
      className="input"
      type={type}
      value={value}
      placeholder={hint}
      disabled={disabled}
      onChange={onChange}
    />
  );
}

export default Input;
