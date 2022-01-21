import GoogleLoginButton from "../../components/ui/google-signIn";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to Stock Price Predictor.</h1>
      <p>
        This is a web application that predicts the stock price of a company
        using Machine Learning in real time!
      </p>
      <p>
        To get started, please click the button above to sign in using your
        Google Account.
      </p>
      <p>
        Or <GoogleLoginButton />
      </p>
    </div>
  );
}
