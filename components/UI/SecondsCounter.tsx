import { useEffect, useState, Fragment } from 'react';

function SecondsCounter() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return <Fragment>{seconds} passed since starting prediction.</Fragment>;
}

export default SecondsCounter;
