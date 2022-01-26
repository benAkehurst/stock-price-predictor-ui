import { dataCleaner } from "../lib/alphaVantageDataCleaner";

export async function makeNewPrediction(props) {
  const URL = `https://stock-price-predictor-engine.nw.r.appspot.com/api/v1/predict/${props}`;
  const response = await fetch(URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Stock not found") {
        return { message: "Stock not found" };
      } else {
        return data;
      }
    });
  return response;
}

export async function getActualPricing(props) {
  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
  const response = await fetch(URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const dataConverted = dataCleaner(data);
      return dataConverted;
    });
  return response;
}
