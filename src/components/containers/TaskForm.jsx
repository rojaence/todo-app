import { useState, useContext, Fragment } from "react";
import TaskContext from "../../context/tasks/TaskContext";
import Button from "../common/Button";
import Input from "../common/Input";
import "../../styles/taskForm.scss";

import { useAlert } from "../../hooks/useAlert";
import Alert from "../Alert";

function TaskForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const { tasks, addTask } = useContext(TaskContext);
  const [isOpenFormAlert, openFormAlert, closeFormAlert, formAlertConfig] =
    useAlert(false);

  const submitTaskForm = async (e) => {
    e.preventDefault();
    try {
      if (!taskTitle) {
        openFormAlert({
          message: "Tittle cannot be empty",
          icon: "alert-outline",
          color: "warning",
        });
      }
      else {
        if (taskExists()) {
          openFormAlert({
            message: "Task already exists",
            icon: "alert-outline",
            color: "error",
          }); 
        } else {
          await addTask({ title: taskTitle.trim() });
          setTaskTitle('');
        }
      }
    } catch (error) {
      openFormAlert({
        message: "Error al guardar tarea",
        icon: "close-outline",
        color: "error",
      });
      console.log(error);
    }
  };

  const taskExists = () =>
    tasks.some(
      (task) => task.title.toLowerCase() === taskTitle.trim().toLowerCase()
    );

  const titleInputHandle = (e) => {
    setTaskTitle(e.target.value);
  };

  return (
    <Fragment>
      <form className="task-form elevation-3">
        <fieldset className="task-form__fieldset">
          <Button
            icon="add"
            iconSize={16}
            fab
            outlined
            onClick={submitTaskForm}
          />
          <Input onChange={titleInputHandle} value={taskTitle} hint="Create a new todo..." />
        </fieldset>
      </form>
      <Alert
        message={formAlertConfig.message}
        icon={formAlertConfig.icon}
        color={formAlertConfig.color}
        show={isOpenFormAlert}
        closeAlert={closeFormAlert}
      />
    </Fragment>
  );
}

export default TaskForm;
