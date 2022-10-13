import { useContext, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskContext from "../../context/tasks/TaskContext";
import Task from "../Task";
import Button from "../common/Button";
import "../../styles/taskList.scss";

import { useAlert } from "../../hooks/useAlert";
import Alert from "../Alert";

function TaskList() {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState(0);
  const { tasks, reorderTasks, indexedDBConnection } =
    useContext(TaskContext);

  const taskAlert = useAlert(false);

  const [stateFilter, setStateFilter] = useState("all");

  useEffect(() => {
    indexedDBConnection();
  }, []);

  useEffect(() => {
    setPendingTasks(tasks.slice().filter((t) => t.completed === false).length);
  }, [tasks]);

  useEffect(() => {
    let filtered = [];
    if (stateFilter === "all") {
      filtered = tasks.slice();
    } else if (stateFilter === "active") {
      filtered = tasks.slice().filter((t) => !t.completed);
    } else if (stateFilter === "completed") {
      filtered = tasks.slice().filter((t) => t.completed);
    }
    setFilteredTasks(filtered);
  }, [stateFilter, tasks]);

  const handleStateFilter = (event, param) => {
    setStateFilter(param);
  };

  
  const deleteCompletedTasks = async () => {
    try {
      console.log('hola mundo')      
    } catch (error) {
      console.log(
        "🚀 ~ file: TaskList.jsx ~ line 57 ~ deleteCompletedTasks ~ error",
        error
        );
      }
    };

    const clearBtnClick = () => {
      if (tasks.filter(t => t.completed).length > 0) {
        taskAlert.openAlert({
          message: "Are you sure you want to delete all completed tasks?",
          color: "warning",
          icon: "help-outline",
          cancelButton: true,
          confirmButton: true,
          confirmAction: deleteCompletedTasks,
        });
      } else {
        taskAlert.openAlert({
          message: 'There are no completed tasks',
          color: 'warning',
          icon: "alert-outline",
          confirmButton: true,
        })
      }
    };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    try {
      if (destination && source) {
        const targetNode = tasks.find(
          (task) => task.title === filteredTasks[result.source.index].title
        );
        const referenceNode = tasks.find(
          (task) => task.title === filteredTasks[result.destination.index].title
        );
        if (targetNode.title != referenceNode.title) {
          setFilteredTasks([]);
          await reorderTasks(targetNode, referenceNode);
        }
      }
    } catch (e) {
      console.log(e);
      taskAlert.openAlert({
        message: "Ha ocurrido un error",
        color: "error",
        icon: "close-outline",
      });
    }
  };

  const activeStyle = {
    color: "var(--accent-color)",
  };

  const itemDraggingStyle = {
    color: "var(--accent-color)",
    backgroundColor: "var(--border-color)",
    borderColor: "var(--accent-color)",
  };

  const FilterControl = () => {
    return (
      <div className="filter-control">
        <Button
          text="All"
          customStyle={stateFilter === "all" ? activeStyle : {}}
          onClick={(event) => handleStateFilter(event, "all")}
        />
        <Button
          text="Active"
          customStyle={stateFilter === "active" ? activeStyle : {}}
          onClick={(event) => handleStateFilter(event, "active")}
        />
        <Button
          text="Completed"
          customStyle={stateFilter === "completed" ? activeStyle : {}}
          onClick={(event) => handleStateFilter(event, "completed")}
        />
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="tasks elevation-4">
          <Droppable droppableId="tasks">
            {(droppableProvided) => (
              <ul
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="list"
              >
                {filteredTasks.map((task, index) => (
                  <Draggable
                    key={task.title}
                    draggableId={task.title}
                    index={index}
                  >
                    {(draggableProvided, snapshot) => (
                      <li
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        className="list__item"
                      >
                        <Task
                          data={task}
                          customStyle={
                            snapshot.isDragging ? itemDraggingStyle : {}
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
          <div className="list-footer">
            <span className="list-footer__counter">
              {pendingTasks} {pendingTasks === 1 ? "item left" : "items left"}
            </span>
            <Button text="Clear Completed" onClick={clearBtnClick} />
          </div>
        </div>
        <FilterControl />
        <Alert
          {...taskAlert.config}
          show={taskAlert.isOpen}
          closeAlert={taskAlert.closeAlert}
        ></Alert>
      </div>
    </DragDropContext>
  );
}

export default TaskList;