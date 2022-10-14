import { useState, useContext, Fragment, useRef } from "react";
import TaskContext from "@/context/tasks/TaskContext";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import "@/styles/taskForm.scss";

import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/Alert";
import { useEffect } from "react";

function TaskForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const { tasks, addTask } = useContext(TaskContext);

  const formAlert = useAlert(false);

  const titleInput = useRef(null);

  useEffect(() => {
    if (!formAlert.isOpen) titleInput.current.focus();
  }, [formAlert.isOpen])

  const submitTaskForm = async (e) => {
    e.preventDefault();
    try {
      if (!taskTitle) {
        formAlert.openAlert({
          message: "Tittle cannot be empty",
          icon: "alert-outline",
          color: "warning",
        });
      }
      else {
        if (taskExists()) {
          formAlert.openAlert({
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
      formAlert.openAlert({
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
        <fieldset className="task-form__fieldset" onClick={() => titleInput.current.focus()}>
          <Button
            icon="add"
            iconSize={18}
            fab
            customStyle={{ height: '34px', width: '34px' }}
            outlined
            onClick={submitTaskForm}
          />
          <Input customStyle={{caretColor: 'var(--accent-color)'}} onChange={titleInputHandle} ref={titleInput} value={taskTitle} hint="Create a new todo..." />
        </fieldset>
      </form>
      <Alert
        {...formAlert.config}
        show={formAlert.isOpen}
        closeAlert={formAlert.closeAlert}
      />
    </Fragment>
  );
}

export default TaskForm;
