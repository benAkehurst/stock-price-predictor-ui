import { useEffect, useState } from "react";
import classes from "./show-prediction.module.css";
import PredictionResult from "../prediction-items/prediction-result";

function ShowPrediction() {
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    fetch("/api/pastPredictions", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setPredictionData(data.pastPredictions);
      });
  }, []);

  return (
    <div className={classes.predictionsWrapper}>
      {predictionData &&
        predictionData.slice(0, 3).map((prediction) => {
          return (
            <PredictionResult key={prediction._id} prediction={prediction} />
          );
        })}
    </div>
  );
}

export default ShowPrediction;
