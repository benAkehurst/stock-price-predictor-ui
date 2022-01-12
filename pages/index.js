import Head from "next/head";
import Predictor from "../components/predictor/Predictor";
import ShowPrediction from "../components/show-prediction/show-prediction";

function HomePage() {
  return (
    <div>
      <Head>
        <title>Stock Price Predictor</title>
        <meta
          name="description"
          content="An app that uses ML to calculate stock prices for the coming day"
        />
      </Head>
      <div className="main-items-wrapper">
        <Predictor />
        <ShowPrediction />
      </div>
    </div>
  );
}

export default HomePage;
