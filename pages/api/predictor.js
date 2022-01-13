import { connectDB, insertDocument } from "../../helpers/db-util";
import { makeNewPrediction } from "../../helpers/api-util";

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
    const { stockSymbol } = req.body;
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
      const stockPrediction = {
        stockSymbol: newPrediction.stockSymbol,
        predictionData: newPrediction.predictionData,
        predictionMadeOnDate: newPrediction.predictionMadeOnDate,
        predictionTimeTaken: newPrediction.predictionTimeTaken,
        priceTrend: newPrediction.priceTrend,
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
