import Icon from "./Icon";
import Button from "./common/Button";
import "../styles/alert.scss";
import "../styles/modal.scss";
import { useEffect, useRef } from "react";

function Alert({
  message = "",
  cancelButton = false,
  confirmButton = true,
  confirmAction = () => {},
  show = false,
  icon = "check-outline",
  color = "success",
  closeAlert,
}) {

  const successButton = useRef(null);

  useEffect(() => {
    if (show) {
      successButton.current.focus();
    }
  }, [show]);

  const handleAlertContainerClick = (e) => e.stopPropagation();

  const confirmBtnOnClick = (e) => {
    confirmAction();
    closeAlert();
  }

  const modalClassStyle = () => {
    let classStyle = ["modal-wrapper"];
    if (show) classStyle.push("is-open");
    return classStyle.join(" ");
  };

  const alertClassStyle = () => {
    let classStyle = ["alert", "elevation-4"];
    classStyle.push(`alert--${color}`);
    return classStyle.join(" ");
  };

  return (
    <div className={modalClassStyle()} onClick={closeAlert}>
      <div className="modal-wrapper__content">
        <article
          className={alertClassStyle()}
          onClick={handleAlertContainerClick}
        >
          <Icon name={icon} size={100} />
          <h2 className="modal__title">{message}</h2>
          <footer className="alert__actions">
            {cancelButton && (
              <Button
                text="Cancel"
                onClick={closeAlert}
                customClass="error-accent"
                outlined
              />
            )}

            {confirmButton && (
              <Button
                text="Ok"
                ref={successButton}
                onClick={confirmBtnOnClick}
                customClass="success-accent"
                outlined
              />
            )}
          </footer>
        </article>
      </div>
    </div>
  );
}

export default Alert;
