import { useEffect, useState } from "react";

function SecondsCounter() {
  const [counter, setCounter] = useState(0);
  let interval;
  let seconds = 0;

  function makeCounter() {
    interval = setInterval(() => {
      setCounter(seconds++);
    }, 1000);
  }

  useEffect(() => {
    makeCounter();
  }, []);

  return (
    <div className="seconds-counter">
      {counter} seconds passed since making request
    </div>
  );
}

export default SecondsCounter;
