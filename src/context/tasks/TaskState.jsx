import { useMemo } from "react";
import { useReducer } from "react";
import { GET_TASKS } from "../types";
import TaskContext from "./TaskContext";
import TaskReducer from "./TaskReducer";

const TaskState = (props) => {
  const initialState = {
    tasks: [],
    maxPriority: 0,
    todoAppDB: null,
  };
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getTasks = () => {
    try {
      const transaction = state.todoAppDB.transaction(["todoList"], "readonly");
      const objectStore = transaction.objectStore("todoList");
      const request = objectStore.openCursor();
      let todoData = [];
      state.maxPriority = 0;
      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          todoData.push(cursor.value);
          if (cursor.value.priority > state.maxPriority)
            state.maxPriority = cursor.value.priority;
          cursor.continue();
        } else {
          todoData.sort((a, b) => {
            if (a.priority < b.priority) {
              return -1;
            } else if (a.priority > b.priority) {
              return 1;
            } else {
              return 0;
            }
          });
          dispatch({ type: GET_TASKS, payload: todoData });
        }
      };
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
      title,
      completed: false,
      priority: state.maxPriority + 1,
    };
    const transaction = state.todoAppDB.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    await objectStore.add(data);
    getTasks();
  };

  const reorderTasks = (target, reference) => {
    const transaction = state.todoAppDB.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    const request = objectStore.openCursor();
    request.onsuccess = async (e) => {
      const cursor = e.target.result;
      if (cursor) {
        let item = cursor.value;
        if (item.title == target.title) {
          item.priority = reference.priority;
        } else if (item.title != target.title) {
          if (
            target.priority < reference.priority &&
            item.priority > target.priority &&
            item.priority <= reference.priority
          ) {
            item.priority -= 1;
          } else if (
            target.priority > reference.priority &&
            item.priority < target.priority &&
            item.priority >= reference.priority
          ) {
            item.priority += 1;
          }
        }
        await objectStore.put(item);
        cursor.continue();
      } else {
        getTasks();
      }
    };
  };

  const deleteTask = async (key) => {
    let reference = state.tasks.find((t) => t.title === key);
    const transaction = state.todoAppDB.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    const request = objectStore.openCursor();
    request.onsuccess = async (e) => {
      const cursor = e.target.result;
      if (cursor) {
        let item = cursor.value;
        if (item.priority > reference.priority) {
          item.priority -= 1;
          await objectStore.put(item);
        }
        cursor.continue();
      } else {
        await objectStore.delete(key);
        getTasks();
      }
    };
  };

  const updateTask = async (data) => {
    const transaction = state.todoAppDB.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    await objectStore.put(data);
    getTasks();
  };

  const value = useMemo(() => ({
    getTasks,
    tasks: state.tasks,
    maxPriority: state.maxPriority,
    getTasksByState,
    indexedDBConnection,
    addTask,
    deleteTask,
    updateTask,
    reorderTasks,
  }));

  return (
    <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
  );
};

export default TaskState;
