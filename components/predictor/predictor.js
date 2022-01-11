import { useContext, useState, Fragment } from "react";
import classes from "./predictor.module.css";
import NotificationContext from "../../store/notification-context";
import MakePrediction from "../prediction-items/make-prediction";
import PredictionResult from "../prediction-items/prediction-result";

function Predictor() {
  const notificationCtx = useContext(NotificationContext);
  const [prediction, setPrediction] = useState(null);

  function makePredictionHandler(stockSymbol) {
    notificationCtx.showNotification({
      title: "Fetching...",
      message: "Making prediction...",
      status: "pending...",
    });
    fetch("/api/predictor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockSymbol: stockSymbol,
      }),
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
        setPrediction(data.predictionResult);
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
    <div className={classes.predictionWrapper}>
      <MakePrediction onMakePrediction={makePredictionHandler} />
      {prediction && <PredictionResult prediction={prediction} />}
    </div>
  );
}

export default Predictor;
