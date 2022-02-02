import { useRef, useState } from "react";
import classes from "./MakePrediction.module.css";
import Button from "../UI/Button";

export type MakePredictionProps = {
  onMakePrediction: (enteredStock: string) => void;
};

function MakePrediction(props: MakePredictionProps) {
  const [isInvalid, setIsInvalid] = useState(false);
  const stockInputRef = useRef(null);

  function makePredictionHandler(event) {
    event.preventDefault();
    const enteredStock = stockInputRef.current.value;

    if (!enteredStock || enteredStock.trim() === "") {
      setIsInvalid(true);
      return;
    }
    props.onMakePrediction(enteredStock);
  }

  return (
    <div className={classes.makePrediction}>
      <div className={classes.banner}>Make a prediction</div>
      <form className={classes.form} onSubmit={makePredictionHandler}>
        <div className={classes.control}>
          <label htmlFor="prediction">Enter Stock Symbol</label>
          <input
            type="text"
            name="prediction"
            id="prediction"
            placeholder="eg AAPL"
            ref={stockInputRef}
          />
        </div>
        {isInvalid && <p>Please enter a valid stock symbol!</p>}
        <Button>Predict</Button>
      </form>
    </div>
  );
}

export default MakePrediction;
