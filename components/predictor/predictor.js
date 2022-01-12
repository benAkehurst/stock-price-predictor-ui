import { useContext, useState } from "react";
import classes from "./predictor.module.css";

import NotificationContext from "../../store/notification-context";
import MakePrediction from "../prediction-items/make-prediction";
import PredictionResult from "../prediction-items/prediction-result";
import PredictingProcessing from "../ui/predicting-processing";

function Predictor() {
  const notificationCtx = useContext(NotificationContext);
  const [predictionData, setPredictionData] = useState(null);
  const [processingPrediction, setProcessingPrediction] = useState(false);

  function makePredictionHandler(stockSymbol) {
    notificationCtx.showNotification({
      title: "Fetching...",
      message: "Making prediction...",
      status: "pending...",
    });
    setProcessingPrediction(true);
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
          setProcessingPrediction(false);
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
          setProcessingPrediction(false);
          setPrediction(null);
        } else {
          setPredictionData(data.predictionResult);
          setProcessingPrediction(false);
          notificationCtx.showNotification({
            title: "Success!",
            message: "Prediction made successfully!",
            status: "success",
          });
        }
      })
      .catch((error) => {
        setProcessingPrediction(false);
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
      {processingPrediction && <PredictingProcessing />}
      {predictionData && <PredictionResult prediction={predictionData} />}
    </div>
  );
}

export default Predictor;
