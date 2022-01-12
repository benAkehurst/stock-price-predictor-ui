import { parseISO, format } from "date-fns";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./prediction-result.module.css";

function PredictionResult(props) {
  const result = parseISO(props.prediction.predictionMadeOnDate);
  const date = format(result, "dd MMM YYY");

  const currencySymbol = props.prediction.stockSymbol.includes(".lon")
    ? "£"
    : "$";

  return (
    <div className={classes.predictionResultWrapper}>
      <div className={classes.predictionResult}>
        <div className={classes.banner}>
          Company - {props.prediction.stockSymbol}
        </div>
        <div className={classes.row}>
          <div className={classes.predictionResultItem}>
            <h3>Open Price</h3>
            <p>
              {currencySymbol}
              {props.prediction.predictionData.open.toFixed(2)}
            </p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Close Price</h3>
            <p>
              {currencySymbol}
              {props.prediction.predictionData.close.toFixed(2)}
            </p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.predictionResultItem}>
            <h3>High Price</h3>
            <p>
              {currencySymbol}
              {props.prediction.predictionData.high.toFixed(2)}
            </p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Low Price</h3>
            <p>
              {currencySymbol}
              {props.prediction.predictionData.low.toFixed(2)}
            </p>
          </div>
        </div>
        <div className={classes.row}>
          <h3>Price Trend</h3>
          <p
            className={
              props.prediction.priceTrend.trend === "up"
                ? classes.green
                : classes.red
            }
          >
            {props.prediction.priceTrend.trend === "up" ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              <FontAwesomeIcon icon={faArrowDown} />
            )}{" "}
            {props.prediction.priceTrend.trend.toUpperCase()}
          </p>
        </div>
        <div className={classes.row}>
          <h3>Prediction Made On:</h3>
          <p>{date}</p>
        </div>
        <div className={classes.row}>
          <h3>Prediction Time Taken:</h3>
          <p>{props.prediction.predictionTimeTaken.toFixed(2)} seconds</p>
        </div>
      </div>
    </div>
  );
}

export default PredictionResult;
