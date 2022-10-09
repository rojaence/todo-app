import { useEffect, useContext, Fragment } from "react";

import ThemeProvider from "./context/theme/ThemeState";
import ThemeContext from "./context/theme/ThemeContext";
import TaskState from "./context/tasks/TaskState";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import TaskForm from "./components/containers/TaskForm";
import TaskList from "./components/containers/TaskList";
import "./app.scss";

import Alert from "./components/Alert";
import { useAlert } from "./hooks/useAlert";
import Button from "./components/common/Button";

function App() {
  const { setThemeOnInit } = useContext(ThemeContext);

  const [isOpenAppAlert, openAppAlert, closeAppAlert, appAlertConfig] = useAlert(false);

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
          {/* <Button text='Show example alert' onClick={ () => openAppAlert({ message: 'Hello world!!', color: 'warning', icon: 'help-outline' }) }/> */}
        </main>
      </TaskState>
      <Footer />

      {/* <Alert message={ appAlertConfig.message } color={ appAlertConfig.color } icon={ appAlertConfig.icon } show={isOpenAppAlert} closeAlert={closeAppAlert}></Alert> */}

    </Fragment>
  );
}

export default () => (
  <ThemeProvider>
    <App></App>
  </ThemeProvider>
);
