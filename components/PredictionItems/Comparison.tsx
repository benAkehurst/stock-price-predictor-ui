import { parseISO, format } from "date-fns";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Comparison.module.css";

export default function Comparison({ outcomeData }) {
  const result = parseISO(outcomeData.prediction.predictionMadeOnDate);
  const date = format(result, "dd MMM YYY");
  const currencySymbol = outcomeData.prediction.stockSymbol.includes(".l")
    ? "£"
    : "$";

  function calculateIfHighLow(predictionPrice: number, actualPrice: number) {
    if (predictionPrice > actualPrice) {
      return false;
    } else if (predictionPrice < actualPrice) {
      return true;
    }
  }

  return (
    <div className={classes.predictionResultWrapper}>
      <div className={classes.predictionResult}>
        <div className={classes.banner}>
          Company - {outcomeData.prediction.stockSymbol}
        </div>
        <div className={classes.row}>
          <div className={classes.predictionResultItem}>
            <h3>Open Price</h3>
            <p>
              Predicted: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.prediction.predictionData.open.toFixed(2) / 100
                : outcomeData.prediction.predictionData.open.toFixed(2)}
            </p>
            <p
              className={
                calculateIfHighLow(
                  outcomeData.prediction.predictionData.open,
                  outcomeData.actualPricing.open
                )
                  ? classes.green
                  : classes.red
              }
            >
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.actualPricing.open.toFixed(2) / 100
                : outcomeData.actualPricing.open.toFixed(2)}
              {calculateIfHighLow(
                outcomeData.prediction.predictionData.open,
                outcomeData.actualPricing.open
              ) ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              )}
            </p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Close Price</h3>
            <p>
              Predicted: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.prediction.predictionData.close.toFixed(2) / 100
                : outcomeData.prediction.predictionData.close.toFixed(2)}
            </p>
            <p
              className={
                calculateIfHighLow(
                  outcomeData.prediction.predictionData.close,
                  outcomeData.actualPricing.close
                )
                  ? classes.green
                  : classes.red
              }
            >
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.actualPricing.close.toFixed(2) / 100
                : outcomeData.actualPricing.close.toFixed(2)}
              {calculateIfHighLow(
                outcomeData.prediction.predictionData.close,
                outcomeData.actualPricing.close
              ) ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              )}
            </p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.predictionResultItem}>
            <h3>High Price</h3>
            <p>
              Predicted: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.prediction.predictionData.high.toFixed(2) / 100
                : outcomeData.prediction.predictionData.high.toFixed(2)}
            </p>
            <p
              className={
                calculateIfHighLow(
                  outcomeData.prediction.predictionData.high,
                  outcomeData.actualPricing.high
                )
                  ? classes.green
                  : classes.red
              }
            >
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.actualPricing.high.toFixed(2) / 100
                : outcomeData.actualPricing.high.toFixed(2)}
              {calculateIfHighLow(
                outcomeData.prediction.predictionData.high,
                outcomeData.actualPricing.high
              ) ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              )}
            </p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Low Price</h3>
            <p>
              Predicted: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.prediction.predictionData.low.toFixed(2) / 100
                : outcomeData.prediction.predictionData.low.toFixed(2)}
            </p>
            <p
              className={
                calculateIfHighLow(
                  outcomeData.prediction.predictionData.low,
                  outcomeData.actualPricing.low
                )
                  ? classes.green
                  : classes.red
              }
            >
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? +outcomeData.actualPricing.low.toFixed(2) / 100
                : outcomeData.actualPricing.low.toFixed(2)}
              {calculateIfHighLow(
                outcomeData.prediction.predictionData.low,
                outcomeData.actualPricing.low
              ) ? (
                <FontAwesomeIcon icon={faArrowUp} />
              ) : (
                <FontAwesomeIcon icon={faArrowDown} />
              )}
            </p>
          </div>
        </div>
        <div className={classes.row}>
          <h3>Prediction Made On:</h3>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
}
