import { useContext, useState } from "react";
import classes from "./predictor.module.css";
import NotificationContext from "../../store/notification-context";
import MakePrediction from "../prediction-items/make-prediction";
import PredictionResult from "../prediction-items/prediction-result";
import PredictingProcessing from "../ui/predicting-processing";

function Predictor({ userId }) {
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
        userId: userId,
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
      {processingPrediction && (
        <div className={classes.predictingProcessing}>
          <p>
            Processing your request now. This can take around 50 seconds, but it
            may also take longer... so please be patient.
          </p>
          <PredictingProcessing />
        </div>
      )}
      {predictionData && (
        <div className={classes.predictionResult}>
          <PredictionResult prediction={predictionData} />
        </div>
      )}
    </div>
  );
}

export default Predictor;
