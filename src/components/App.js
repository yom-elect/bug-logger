import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import LogItem from "./LogItem";
import AddLogItem from "./AddLogItem";
import Alerts from "./Alert";
import { ipcRenderer } from "electron";

const App = () => {
  const [logs, setLogs] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  useEffect(() => {
    ipcRenderer.send("logs:load");

    ipcRenderer.on("logs:get", (e, logs) => {
      setLogs(JSON.parse(logs));
    });
  }, []);

  const addItem = (item) => {
    if (item.text === "" || item.user === "" || item.priority === "") {
      showAlert("Please Enter all fields", "danger");
      return false;
    }
    // item._id = Math.floor(Math.random() * 9000) + 1000;
    // item.created = new Date().toString();
    // setLogs([...logs, item]);
    ipcRenderer.send("logs:add", item);
    showAlert("Log Added");
  };

  const showAlert = (message, variant = "success", seconds = 3000) => {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: " ",
        variant: "success",
      });
    }, seconds);
  };

  const deleteItem = (_id) => {
    // setLogs(logs.filter((item) => item._id !== _id));
    ipcRenderer.send("logs:delete", _id);
    showAlert("Log Removed");
  };

  return (
    <Container>
      <AddLogItem addItem={(item) => addItem(item)} />
      <Alerts {...alert} />
      <Table>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Log Text</th>
            <th>User</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogItem
              key={log._id}
              log={log}
              deleteItem={(id) => deleteItem(id)}
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
