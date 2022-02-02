import Head from "next/head";
import { useSession } from "next-auth/react";
import { Container, SimpleGrid } from "@mantine/core";
import Predictor from "../components/Predictor/Predictor";
import ShowPrediction from "../components/ShowPrediction/ShowPrediction";
import LandingPage from "../components/UI/LandingPage";

function HomePage() {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Stock Price Predictor</title>
        <meta
          name="description"
          content="An app that uses ML to calculate stock prices for the coming day"
        />
      </Head>
      {session ? (
        <Container>
          <SimpleGrid
            cols={2}
            spacing="lg"
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "md" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {/* @ts-ignore */}
            <Predictor userId={session.user._id} />
            {/* @ts-ignore */}
            <ShowPrediction userId={session.user._id} />
          </SimpleGrid>
        </Container>
      ) : (
        <div className="main-items-wrapper">
          <LandingPage />
        </div>
      )}
    </div>
  );
}

export default HomePage;
