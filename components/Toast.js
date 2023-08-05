import React, { useContext, useEffect } from "react";
import { ShowToastContext } from "../context/showToastContext";

const Toast = ({ message }) => {
  const { showToastMessage, setToastMessage } = useContext(ShowToastContext);
  useEffect(() => {
    setInterval(() => {
      setToastMessage(null);
    }, 3000);
  }, [message]);
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
