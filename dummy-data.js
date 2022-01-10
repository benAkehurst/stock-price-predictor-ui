const DUMMY_PREDICTION = [
  {
    message: "Prediction made successfully!",
    stockSymbol: "AAPL",
    predictionData: {
      open: 178.4349456310272,
      high: 180.6674599456787,
      low: 174.73712194919585,
      close: 174.73712194919585,
    },
    priceTrend: {
      trend: "down",
      percentage: 0.020723651797881652,
    },
    predictionTimeTaken: 34.496,
    predictionMadeOnDate: "2022-01-10T14:18:38.703Z",
  },
];

export function getDummyPrediction() {
  return DUMMY_PREDICTION;
}
