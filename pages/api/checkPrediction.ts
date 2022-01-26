import { parseISO, format } from "date-fns";
import { connectDB, getSinglePrediction } from "../../helpers/dbUtil";
import { getActualPricing } from "../../helpers/apiUtil";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { predictionId, stockSymbol, date } = JSON.parse(req.body);
  const result = parseISO(date);
  const predictionDate = format(result, "yyyy-MM-dd");
  let client;

  try {
    client = await connectDB();
  } catch (err) {
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  const singlePrediction = await getSinglePrediction(
    client,
    "predictions",
    predictionId
  );
  const actualPricing = await getActualPricing(stockSymbol);
  const actualPricingForDate = actualPricing.filter((pricing) => {
    return pricing.date === predictionDate;
  });

  const responseData = {
    prediction: singlePrediction[0],
    actualPricing: actualPricingForDate[0],
  };

  try {
    res.status(200).json({ singlePrediction: responseData });
  } catch (error) {
    res.status(500).json({ message: "Error finding document" });
  }
  client.close();
}
