import { Container } from "@mantine/core";

export default function LandingPage() {
  return (
    <Container>
      <h1>Welcome to Stock Price Predictor.</h1>
      <p>
        This is a web application that predicts the stock price of a company
        using Machine Learning in real time and you'll have a prediction of what
        the stock market is going to do!
      </p>
      <p>
        To get started, please click the button above to sign in using your
        Google Account.
      </p>
    </Container>
  );
}
