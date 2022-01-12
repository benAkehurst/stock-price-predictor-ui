import { parseISO, format } from "date-fns";

import classes from "./prediction-result.module.css";

function PredictionResult(props) {
  const result = parseISO(props.prediction.predictionMadeOnDate);
  const date = format(result, "dd MMM YYY");
  return (
    <div className={classes.predictionResult}>
      <div className={classes.banner}>
        <h2>Prediction Result</h2>
      </div>
      <div className={classes.predictionResults}>
        <div className={classes.row}>
          Company - {props.prediction.stockSymbol}
        </div>
        <div className={classes.row}>
          <div className={classes.predictionResultItem}>
            <h3>Open Price</h3>
            <p>{props.prediction.predictionData.open.toFixed(2)}</p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Close Price</h3>
            <p>{props.prediction.predictionData.close.toFixed(2)}</p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.predictionResultItem}>
            <h3>High Price</h3>
            <p>{props.prediction.predictionData.high.toFixed(2)}</p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Low Price</h3>
            <p>{props.prediction.predictionData.low.toFixed(2)}</p>
          </div>
        </div>
        <div className={classes.predictionResultItem}>
          <h3>Price Trend</h3>
          <p>{props.prediction.priceTrend.trend}</p>
        </div>
        <div className={classes.row}>
          <h3>Date Made</h3>
          <p>{date}</p>
        </div>
        <div className={classes.predictionResultItem}>
          <h3>Prediction Time Taken</h3>
          <p>{props.prediction.predictionTimeTaken.toFixed(2)} seconds</p>
        </div>
      </div>
    </div>
  );
}

export default PredictionResult;
