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
      <div className={classes.banner}>
        <h2>Make a prediction</h2>
      </div>
      <form className={props.form} onSubmit={makePredictionHandler}>
        <div className={classes.row}>
          <div className={classes.control}>
            <label htmlFor="prediction">Stock Symbol</label>
            <input
              type="text"
              name="prediction"
              id="prediction"
              placeholder="eg AAPL"
              type="text"
              name="prediction"
              id="prediction"
              placeholder="eg AAPL"
              ref={stockInputRef}
            />
          </div>
        </div>
        {isInvalid && <p>Please enter a valid stock symbol!</p>}
        <button>Predict</button>
      </form>
    </div>
  );
}

export default MakePrediction;
