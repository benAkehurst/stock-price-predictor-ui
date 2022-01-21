import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import PredictionResult from "../components/prediction-items/prediction-result";

function Predictions(props) {
  const [predictionData, setPredictionData] = useState([]);
  useEffect(() => {
    fetch(`/api/pastPredictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: props.user._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPredictionData(data.pastPredictions);
      });
  }, []);

  return (
    <div className="main-items-wrapper">
      <h2>Predictions page</h2>
      {predictionData.map((prediction) => {
        return (
          <PredictionResult key={prediction._id} prediction={prediction} />
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}
export default Predictions;
