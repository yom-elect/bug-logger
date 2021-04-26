import React from "react";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

const LogItem = ({
  log: { _id, priority, user, text, created },
  deleteItem,
}) => {
  const setVariant = (priority) => {
    return priority === "high"
      ? "danger"
      : priority === "moderate"
      ? "warning"
      : "success";
  };

  return (
    <tr>
      <td>
        <Badge variant={setVariant(priority)} className="p-2">
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
      </td>
      <td>{text}</td>
      <td>{user}</td>
      <td>
        <Moment format="MMMM Do YYYY, h:mm:ss a">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => deleteItem(_id)}>
          x
        </Button>
      </td>
    </tr>
  );
};

export default LogItem;
