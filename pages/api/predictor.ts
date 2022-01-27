import { connectDB, insertDocument } from "../../helpers/dbUtil";
import { makeNewPrediction } from "../../helpers/apiUtil";

export type StockPrediction = {
  stockSymbol: string;
  predictionData: StockPredictionData;
  predictionMadeOnDate: string;
  predictionTimeTaken: Number;
  priceTrend: StockPriceTrend;
  userId: string;
  _id?: string;
};

export type StockPredictionData = {
  open: number;
  high: number;
  low: number;
  close: number;
};
export type StockPriceTrend = {
  trend: string;
  percentage: number;
};

export default async function handler(req, res) {
  let client;
  try {
    client = await connectDB();
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  if (req.method === "POST") {
    const { stockSymbol, userId } = req.body;
    if (!stockSymbol) {
      res.status(400).json({ message: "Stock symbol is required" });
      client.close();
      return;
    }
    const newPrediction = await makeNewPrediction(stockSymbol);

    if (newPrediction.message === "Stock not found") {
      res.status(400).json({ message: "Stock not found" });
      client.close();
      return;
    }

    try {
      const stockPrediction: StockPrediction = {
        stockSymbol: newPrediction.stockSymbol,
        predictionData: newPrediction.predictionData,
        predictionMadeOnDate: newPrediction.predictionMadeOnDate,
        predictionTimeTaken: newPrediction.predictionTimeTaken,
        priceTrend: newPrediction.priceTrend,
        userId: userId,
      };
      let result;
      result = await insertDocument(client, "predictions", stockPrediction);
      stockPrediction._id = result.insertedId;
      res.status(201).json({ predictionResult: stockPrediction });
    } catch (error) {
      res.status(500).json({ message: "Error inserting document" });
    }
  }
  client.close();
}
