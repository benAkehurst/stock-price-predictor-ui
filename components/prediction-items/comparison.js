import { parseISO, format } from "date-fns";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./comparison.module.css";

export default function Comparison(props) {
  const { outcomeData } = props;
  const result = parseISO(outcomeData.prediction.predictionMadeOnDate);
  const date = format(result, "dd MMM YYY");
  const currencySymbol = outcomeData.prediction.stockSymbol.includes(".l")
    ? "£"
    : "$";

  function calculateOpen() {
    if (
      outcomeData.prediction.predictionData.open.toFixed(2) >
      outcomeData.actualPricing.open.toFixed(2)
    ) {
      return false;
    } else {
      return true;
    }
  }

  function calculateClose() {
    if (
      outcomeData.prediction.predictionData.close.toFixed(2) >
      outcomeData.actualPricing.close.toFixed(2)
    ) {
      return false;
    } else {
      return true;
    }
  }

  function calculateHigh() {
    if (
      outcomeData.prediction.predictionData.high.toFixed(2) >
      outcomeData.actualPricing.high.toFixed(2)
    ) {
      return false;
    } else {
      return true;
    }
  }

  function calculateLow() {
    if (
      outcomeData.prediction.predictionData.low.toFixed(2) >
      outcomeData.actualPricing.low.toFixed(2)
    ) {
      return false;
    } else {
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
                ? outcomeData.prediction.predictionData.open.toFixed(2) / 100
                : outcomeData.prediction.predictionData.open.toFixed(2)}
            </p>
            <p className={calculateOpen() ? classes.green : classes.red}>
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? outcomeData.actualPricing.open.toFixed(2) / 100
                : outcomeData.actualPricing.open.toFixed(2)}
              {calculateOpen() ? (
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
                ? outcomeData.prediction.predictionData.close.toFixed(2) / 100
                : outcomeData.prediction.predictionData.close.toFixed(2)}
            </p>
            <p className={calculateClose() ? classes.green : classes.red}>
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? outcomeData.actualPricing.close.toFixed(2) / 100
                : outcomeData.actualPricing.close.toFixed(2)}
              {calculateClose() ? (
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
                ? outcomeData.prediction.predictionData.high.toFixed(2) / 100
                : outcomeData.prediction.predictionData.high.toFixed(2)}
            </p>
            <p className={calculateHigh() ? classes.green : classes.red}>
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? outcomeData.actualPricing.high.toFixed(2) / 100
                : outcomeData.actualPricing.high.toFixed(2)}
              {calculateHigh() ? (
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
                ? outcomeData.prediction.predictionData.low.toFixed(2) / 100
                : outcomeData.prediction.predictionData.low.toFixed(2)}
            </p>
            <p className={calculateLow() ? classes.green : classes.red}>
              Actual: {currencySymbol}
              {currencySymbol === "£"
                ? outcomeData.actualPricing.low.toFixed(2) / 100
                : outcomeData.actualPricing.low.toFixed(2)}
              {calculateLow() ? (
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
