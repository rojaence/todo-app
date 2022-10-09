import { useState, useContext } from "react";
import TaskContext from "@/context/tasks/TaskContext";

import Button from "@/components/common/Button";
import Radio from "@/components/common/Radio";
import "@/styles/task.scss";

function Task({ data = {}, customStyle = {} }) {
  const { deleteTask, updateTask } = useContext(TaskContext);

  const taskClassStyle = () => {
    let classStyle = ["task"];
    if (data.completed) classStyle.push("task--checked");
    return classStyle.join(" ");
  };

  const handleCheck = async (e) => {
    console.log("🚀 ~ file: Task.jsx ~ line 39 ~ handleCheck ~ e", e)
    try {
      let newData = {
        title: data.title,
        completed: !data.completed,
      };
      console.log(
        "🚀 ~ file: Task.jsx ~ line 28 ~ handleCheck ~ newData",
        newData
      );
      await updateTask(newData);
      console.log("Se debió actualizar la data")
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBtn = async (key) => {
    try {
      await deleteTask(key);
    } catch (error) {
      console.log(error);
    }
  };

  const titleDecoration = {
    textDecoration: data.completed ? "line-through" : "none",
  };

  const taskCheckboxStyle = {
    backgroundImage: "var(--accent-gradient-color)",
  };

  return (
    <article className={taskClassStyle()} style={customStyle}>
      <Radio
        type="radio"
        customActiveStyle={data.completed ? taskCheckboxStyle : {}}
        icon="check"
        checked={data.completed}
        autoHideIcon={!data.completed}
        iconSize={18}
        onChange={(e) => handleCheck(e)}
      />
      <span className="task__title" style={titleDecoration}>
        {data.title}
      </span>
      <Button
        customClass={"error"}
        fab
        icon="close"
        autoHide
        iconSize={18}
        onClick={() => handleDeleteBtn(data.title)}
      />
    </article>
  );
}

export default Task;
