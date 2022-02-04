import { connectDB, deleteSinglePrediction } from "../../../helpers/dbUtil";

export default async function handler(req, res) {
  let client;
  try {
    client = await connectDB();
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  if (req.method === "DELETE") {
    const { pastPredictions } = req.query;
    const deletedPrediction = await deleteSinglePrediction(
      client,
      "predictions",
      pastPredictions
    );
    try {
      res.status(200).json({
        message: "deleted prediction",
        deletedPrediction: deletedPrediction,
      });
    } catch (error) {
      res.status(500).json({ message: "Error deleting document" });
    }
  }
  client.close();
}
