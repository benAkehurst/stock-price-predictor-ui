import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { SimpleGrid } from "@mantine/core";
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
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: 980, cols: 3, spacing: "md" },
            { maxWidth: 755, cols: 2, spacing: "sm" },
            { maxWidth: 600, cols: 1, spacing: "sm" },
          ]}
        >
          {predictionData.map((prediction) => {
            return (
              <StyledSinglePrediction key={prediction._id}>
                <PredictionResult prediction={prediction} />
              </StyledSinglePrediction>
            );
          })}
        </SimpleGrid>
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
