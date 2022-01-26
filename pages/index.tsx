import Head from "next/head";
import { useSession } from "next-auth/react";
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
        <div className="main-items-wrapper">
          {/* @ts-ignore */}
          <Predictor userId={session.user._id} />
          {/* @ts-ignore */}
          <ShowPrediction userId={session.user._id} />
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
