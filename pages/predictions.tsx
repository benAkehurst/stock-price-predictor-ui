import React, { Fragment, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import styled from "styled-components";
import { SimpleGrid } from "@mantine/core";
import PredictionResult from "../components/PredictionItems/PredictionResult";
import NotificationContext from "../store/NotificationContext";

function Predictions(props) {
  const [predictionData, setPredictionData] = useState([]);
  const notificationCtx = useContext(NotificationContext);

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
  }, [props.user._id]);

  const deletePredictionHandler = async (predictionId: string) => {
    notificationCtx.showNotification({
      title: "Deleting...",
      message: "Deleting Prediction...",
      status: "pending",
    });
    fetch(`/api/pastPredictions/${predictionId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Prediction Deleted!",
          status: "success",
        });
      })
      .then(() => {
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
      });
  };

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
                <PredictionResult
                  prediction={prediction}
                  onDeletePrediction={deletePredictionHandler}
                />
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
