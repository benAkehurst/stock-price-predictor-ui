import { Fragment } from 'react';
import classes from './predicting-processing.module.css';
import SecondsCounter from './seconds-counter';

function PredictingProcessing() {
  return (
    <Fragment>
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
      {/* <SecondsCounter /> */}
    </Fragment>
  );
}

export default PredictingProcessing;
