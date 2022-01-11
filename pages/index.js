import Head from "next/head";
import Predictor from "../components/predictor/Predictor";

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
      <Predictor />
    </div>
  );
}

export default HomePage;
