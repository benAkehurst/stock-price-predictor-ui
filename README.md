# Stock Price Predictor

Stock price predictor is an update of [this project](https://github.com/benAkehurst/stock-price-predictor), where I used the BrainJS library to predict stock prices.

In Stock Price Predictor V2, I've updated that past project massively, using techniques and skills I've learned since V1.

I've split the project into 2 bits, [an engine](https://github.com/benAkehurst/stock-price-predictor-engine), that runs the predictions, and an agnostic UI that talks to the prediction engine api.

I did this because I wanted a separation of concerns with a backend and frontend, and I also wanted to harness the power of NextJS, where you can write backend and frontend code all in one project.

This app was a great opportunity to learn, and in this project I've learned NextAuth and logging in with a google account, GCP and it's App engine framework and cli for hosting Nodejs projects.

## Project prerequisites

- MongoDB atlas account and collection running in the cloud
- An AlphaVantage API key - [get one here](https://www.alphavantage.co/support/#api-key)
- A Google Account with a [valid client ID](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid) setup in the Google Developer Portal

## Running the project

1. First, visit the [engine repo](https://github.com/benAkehurst/stock-price-predictor-engine), download and run locally for a working instance of the predictor.
2. Download and clone this project and run `npm i`
3. Update the .env.local.example file, and fill in the missing parameters and save the new file as .env.local
4. Run the project with `npm run dev`
