import Head from "next/head";
import { useSession } from "next-auth/react";
import Predictor from "../components/predictor/Predictor";
import ShowPrediction from "../components/show-prediction/show-prediction";
import LandingPage from "../components/ui/landing-page";

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
        <div className="main-items-wrapper">
          <Predictor />
          <ShowPrediction />
        </div>
      ) : (
        <div className="main-items-wrapper">
          <LandingPage />
        </div>
      )}
    </div>
  );
}

export default HomePage;
