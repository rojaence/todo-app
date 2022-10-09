import { useReducer } from "react";
import { GET_TASKS } from "../types";
import TaskContext from "./TaskContext";
import TaskReducer from "./TaskReducer";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      /* { id: "1", title: "Complete online JavaScript course", completed: true },
      { id: "2", title: "Jog around the park 3x", completed: false },
      { id: "3", title: "10 minutes meditation", completed: false },
      { id: "4", title: "Read for 1 hour", completed: false },
      { id: "5", title: "Pick up groceries", completed: false },
      {
        id: "6",
        title: "Complete Todo App on Frontend Mentor",
        completed: false,
      }, */
    ],
    order: [],
    todoAppDB: null,
  };
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getTasks = () => {
    try {
      // TODO: Obtener las tareas de localStorage
      const transaction = state.todoAppDB.transaction(["todoList"], "readonly");
      const objectStore = transaction.objectStore("todoList");
      const request = objectStore.openCursor();
      let todoData = [];
      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          todoData.push(cursor.value);
          // IMPORTANT: Evaluar en este punto algún dato como el orden de la tarea
          cursor.continue();
        } else {
          dispatch({ type: GET_TASKS, payload: todoData });
        }
      };
      /* const res = state.tasks;
      dispatch({ type: GET_TASKS, payload: res }); */
    } catch (error) {
      console.log(error);
    }
  };

  const indexedDBConnection = () => {
    const indexedDB = window.indexedDB;
    let db;
    if (indexedDB) {
      const request = indexedDB.open("reactTodoAppDB", 1);
      request.onsuccess = () => {
        db = request.result;
        state.todoAppDB = db;
        getTasks();
      };
      request.onupgradeneeded = (e) => {
        db = e.target.result;
        state.todoAppDB = db;
        const objectStore = db.createObjectStore("todoList", {
          keyPath: "title",
        });
      };
      request.onerror = (error) => {
        console.log("Error", error);
      };
    }
  };

  const getTasksByState = (taskState) => {
    const res = state.tasks;
    if (taskState) {
      if (taskState === "active")
        return res.filter((task) => task.completed === false);
      if (taskState === "completed")
        return res.filter((task) => task.completed === true);
    }
    return res;
  };

  const addTask = async ({ title }) => {
    let data = {
      title: title,
      completed: false,
    };
    const transaction = state.todoAppDB.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    await objectStore.add(data);
    getTasks();
  };

  const deleteTask = async (key) => {
    const transaction = state.todoAppDB.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    await objectStore.delete(key);
    getTasks();
  };

  const updateTask = async (data) => {
    console.log('data recibida')
    console.log(data)
    const transaction = state.todoAppDB.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    await objectStore.put(data);
    getTasks()
  };

  return (
    <TaskContext.Provider
      value={{
        getTasks,
        tasks: state.tasks,
        getTasksByState,
        indexedDBConnection,
        addTask,
        deleteTask,
        updateTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
