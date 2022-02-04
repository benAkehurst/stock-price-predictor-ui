import { useEffect, useState, useContext } from "react";
import classes from "./ShowPrediction.module.css";
import PredictionResult from "../PredictionItems/PredictionResult";
import { StockPrediction } from "../../pages/api/predictor";
import { ShowPredictionProps } from "../ShowPredictions/ShowPredictions";
import NotificationContext from "../../store/NotificationContext";

function ShowPrediction({ userId }: ShowPredictionProps) {
  const [predictionData, setPredictionData] = useState<StockPrediction[]>([]);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    fetch(`/api/pastPredictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPredictionData(data.pastPredictions);
      });
  }, []);

  const deletePredictionHandler = async (predictionId: string) => {
    notificationCtx.showNotification({
      title: "Deleting...",
      message: "Deleting Prediction...",
      status: "pending",
    });
    fetch(`/api/pastPredictions/${predictionId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Prediction Deleted!",
          status: "success",
        });
      })
      .then(() => {
        fetch(`/api/pastPredictions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        })
          .then((res) => res.json())
          .then((data) => {
            setPredictionData(data.pastPredictions);
          });
      });
  };

  return (
    <div className={classes.predictionsWrapper}>
      <div className={classes.banner}>Last 3 Predictions</div>
      {predictionData &&
        predictionData.slice(0, 3).map((prediction) => {
          return (
            <PredictionResult
              key={prediction._id}
              prediction={prediction}
              onDeletePredictionHandler={deletePredictionHandler}
            />
          );
        })}
    </div>
  );
}

export default ShowPrediction;
