import classes from "./PredictingProcessing.module.css";
import SecondsCounter from "./SecondsCounter";

function PredictingProcessing() {
  return (
    <div className={classes.predictingWrapper}>
      <div className={classes.ldsGrid}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <SecondsCounter />
    </div>
  );
}

export default PredictingProcessing;
