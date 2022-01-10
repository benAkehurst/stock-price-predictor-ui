import Head from "next/head";
import MakePrediction from "../components/predictions/make-prediction";

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
      <MakePrediction />
    </div>
  );
}

export default HomePage;
