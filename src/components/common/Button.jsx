import Icon from "../Icon";
import "../../styles/button.scss";

function Button({
  text = "",
  icon = "",
  autoHide = false,
  autoHideIcon = false,
  customStyle = {},
  customClass = "",
  iconSize = 48,
  fab = false,
  outlined = false,
  color = '',
  onClick = () => {},
}) {
  const buttonClassStyle = () => {
    let classStyle = ["button"];
    if (fab) classStyle.push("button--fab");
    if (outlined) classStyle.push("button--outlined");
    if (autoHide) classStyle.push("button--autohide");
    if (autoHideIcon) classStyle.push("button--autohide-icon");
    if (color) classStyle.push(color);
    if (customClass) classStyle.push(customClass);
    return classStyle.join(" ");
  };

  return (
    <button
      style={customStyle}
      className={buttonClassStyle()}
      onClick={onClick}
    >
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      <span className="button__text">{text}</span>
    </button>
  );
}

export default Button;
