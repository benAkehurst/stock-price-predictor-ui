import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import PredictionResult from "../components/PredictionItems/PredictionResult";
import { Fragment } from "react/cjs/react.production.min";

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
    <Fragment>
      <StyledContainer>
        <h2>Predictions page</h2>
        <StyledSinglePredictionContainer>
          {predictionData.map((prediction) => {
            return (
              <StyledSinglePrediction key={prediction._id}>
                <PredictionResult prediction={prediction} />
              </StyledSinglePrediction>
            );
          })}
        </StyledSinglePredictionContainer>
      </StyledContainer>
    </Fragment>
  );
}

const StyledContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledSinglePredictionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem;
`;

const StyledSinglePrediction = styled.div`
  margin: 1rem;
`;

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
