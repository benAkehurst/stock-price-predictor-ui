import { useState, useContext } from "react";
import { parseISO, format } from "date-fns";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid } from "@mantine/core";
import NotificationContext from "../../store/NotificationContext";
import Modal from "../UI/Modal";
import Comparison from "./Comparison";
import classes from "./PredictionResult.module.css";
import { StockPrediction } from "../../pages/api/predictor";

export type PredictionResultProps = {
  prediction: StockPrediction;
  actualPricing?: ActualPricing;
  onDeletePrediction?: (predictionId: string) => void;
};

export type ActualPricing = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

function PredictionResult(props: PredictionResultProps) {
  const notificationCtx = useContext(NotificationContext);
  const [showModal, setShowModal] = useState(false);
  const [actualOutcome, setActualOutcome] =
    useState<PredictionResultProps>(null);
  const result = parseISO(props.prediction.predictionMadeOnDate);
  const date = format(result, "dd MMM YYY");
  const isToday = format(new Date(), "dd MMM YYY");
  const currencySymbol = props.prediction.stockSymbol.includes(".l")
    ? "£"
    : "$";

  const checkAccuracyHandler = async () => {
    const reqBody = {
      predictionId: props.prediction._id,
      stockSymbol: props.prediction.stockSymbol,
      date: props.prediction.predictionMadeOnDate,
    };
    notificationCtx.showNotification({
      title: "Checking...",
      message: "Checking Prediction Accuracy...",
      status: "pending",
    });
    fetch("/api/checkPrediction", {
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        setActualOutcome(data.singlePrediction);
        setShowModal(true);
        notificationCtx.showNotification({
          title: "Success!",
          message: "Accuracy checked successfully!",
          status: "success",
        });
      });
  };

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
              {currencySymbol === "£"
                ? +props.prediction.predictionData.open.toFixed(2) / 100
                : props.prediction.predictionData.open.toFixed(2)}
            </p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Close Price</h3>
            <p>
              {currencySymbol}
              {currencySymbol === "£"
                ? +props.prediction.predictionData.close.toFixed(2) / 100
                : props.prediction.predictionData.close.toFixed(2)}
            </p>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.predictionResultItem}>
            <h3>High Price</h3>
            <p>
              {currencySymbol}
              {currencySymbol === "£"
                ? +props.prediction.predictionData.high.toFixed(2) / 100
                : props.prediction.predictionData.high.toFixed(2)}
            </p>
          </div>
          <div className={classes.predictionResultItem}>
            <h3>Low Price</h3>
            <p>
              {currencySymbol}
              {currencySymbol === "£"
                ? +props.prediction.predictionData.low.toFixed(2) / 100
                : props.prediction.predictionData.low.toFixed(2)}
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
      <Grid grow>
        <Grid.Col span={4}>
          {isToday === date ? null : (
            <Button onClick={checkAccuracyHandler}>
              Check Prediction Accuracy
            </Button>
          )}
        </Grid.Col>
        <Grid.Col span={4}>
          <Button
            color="red"
            onClick={() => {
              console.log("clicked");
              props.onDeletePrediction(props.prediction._id);
            }}
          >
            Delete Prediction
          </Button>
        </Grid.Col>
      </Grid>
      {showModal ? (
        <Modal onClose={() => setShowModal(false)} show={showModal}>
          <Comparison outcomeData={actualOutcome} />
        </Modal>
      ) : null}
    </div>
  );
}

export default PredictionResult;
