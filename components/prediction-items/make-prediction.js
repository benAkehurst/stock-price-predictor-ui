import { useRef, useState } from "react";
import classes from "./make-prediction.module.css";

function MakePrediction(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const stockInputRef = useRef();

  function makePredictionHandler(event) {
    event.preventDefault();
    const enteredStock = stockInputRef.current.value;

    if (!enteredStock || enteredStock.trim() === "") {
      setIsInvalid(true);
      return;
    }
    props.onMakePrediction({ enteredStock: enteredStock });
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
        <button>Predict</button>
      </form>
    </div>
  );
}

export default MakePrediction;
