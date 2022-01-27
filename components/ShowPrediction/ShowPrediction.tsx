import { useEffect, useState } from "react";
import classes from "./ShowPrediction.module.css";
import PredictionResult from "../PredictionItems/PredictionResult";
import { StockPrediction } from "../../pages/api/predictor";
import { ShowPredictionProps } from "../ShowPredictions/ShowPredictions";

function ShowPrediction({ userId }: ShowPredictionProps) {
  const [predictionData, setPredictionData] = useState<StockPrediction[]>([]);

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
