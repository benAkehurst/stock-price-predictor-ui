import { useEffect, useState } from "react";
import classes from "./show-prediction.module.css";
import PredictionResult from "../prediction-items/prediction-result";
import PredictingProcessing from "../ui/PredictingProcessing";

function ShowPrediction({ userId }) {
  const [predictionData, setPredictionData] = useState([]);

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

  return (
    <div className={classes.predictionsWrapper}>
      <div className={classes.banner}>Last 3 Predictions</div>
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
