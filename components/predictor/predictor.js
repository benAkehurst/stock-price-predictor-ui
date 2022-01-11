import { useContext, useState, Fragment } from "react";
import classes from "./predictor.module.css";
import NotificationContext from "../../store/notification-context";
import MakePrediction from "../prediction-items/make-prediction";
import PredictionResult from "../prediction-items/prediction-result";
import SecondsCounter from "../ui/seconds-counter";

function Predictor() {
  const notificationCtx = useContext(NotificationContext);
  const [prediction, setPrediction] = useState(null);
  const [counting, setCounting] = useState(false);

  function makePredictionHandler(stockSymbol) {
    notificationCtx.showNotification({
      title: "Fetching...",
      message: "Making prediction...",
      status: "pending...",
    });
    setCounting(true);
    fetch("/api/predictor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stockSymbol: stockSymbol.enteredStock,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((error) => {
          setCounting(false);
          throw new Error(error.message || "Something went wrong");
        });
      })
      .then((data) => {
        if (data.predictionResult.message === "Stock not found") {
          notificationCtx.showNotification({
            title: "Error",
            message: "Stock not found",
            status: "error",
          });
          setCounting(false);
          setPrediction(null);
        } else {
          setPrediction(data.predictionResult);
          setCounting(false);
          notificationCtx.showNotification({
            title: "Success!",
            message: "Prediction made successfully!",
            status: "success",
          });
        }
      })
      .catch((error) => {
        setCounting(false);
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
      {counting && <SecondsCounter />}
      {prediction && <PredictionResult prediction={prediction} />}
    </div>
  );
}

export default Predictor;
