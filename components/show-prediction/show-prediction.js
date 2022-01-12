import { useEffect, useState } from "react";
import classes from "./show-prediction.module.css";
import PredictionResult from "../prediction-items/prediction-result";
import PredictingProcessing from "../ui/predicting-processing";

function ShowPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/pastPredictions", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setPredictionData(data.pastPredictions);
      });
  }, []);

  return (
    <div className={classes.predictionsWrapper}>
      {isLoading && <PredictingProcessing />}
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
