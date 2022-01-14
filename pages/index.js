import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import Predictor from "../components/predictor/Predictor";
import ShowPrediction from "../components/show-prediction/show-prediction";

function HomePage() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        Welcome user
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Stock Price Predictor</title>
        <meta
          name="description"
          content="An app that uses ML to calculate stock prices for the coming day"
        />
      </Head>
      <div>
        Click to sign into your user account <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
      <div className="main-items-wrapper">
        <Predictor />
        <ShowPrediction />
      </div>
    </div>
  );
}

export default HomePage;
