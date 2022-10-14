import { useEffect, useContext, Fragment } from "react";

import ThemeProvider from "@/context/theme/ThemeState";
import ThemeContext from "@/context/theme/ThemeContext";
import TaskState from "@/context/tasks/TaskState";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import TaskForm from "@/components/containers/TaskForm";
import TaskList from "@/components/containers/TaskList";
import "@/app.scss";

function App() {
  const { setThemeOnInit } = useContext(ThemeContext);

  useEffect(() => {
    setThemeOnInit();
  }, []);

  return (
    <Fragment>
      <Header />
      <TaskState>
        <main className="main">
          <TaskForm />
          <TaskList />
        </main>
      </TaskState>
      <Footer />
    </Fragment>
  );
}

export default () => (
  <ThemeProvider>
    <App></App>
  </ThemeProvider>
);
