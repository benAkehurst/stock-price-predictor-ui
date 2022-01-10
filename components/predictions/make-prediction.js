import { useContext, useState, Fragment } from "react";
import classes from "./make-prediction.module.css";
import NotificationContext from "../../store/notification-context";

function MakePrediction() {
  const notificationCtx = useContext(NotificationContext);
  const [prediction, setPrediction] = useState(null);

  function makePredictionHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: "Fetching...",
      message: "Making prediction...",
      status: "pending",
    });
    fetch("/api/predictor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      })
      .then((data) => {
        setPrediction(data[0]);
        notificationCtx.showNotification({
          title: "Success!",
          message: "Prediction made successfully!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <Fragment>
      <button onClick={makePredictionHandler}>Make Prediction</button>
      {prediction && <div>{prediction.message}</div>}
    </Fragment>
  );
}

export default MakePrediction;
