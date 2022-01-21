import { connectDB, getAllPredictions } from "../../helpers/db-util";

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
    const { userId } = req.body;
    const pastPredictions = await getAllPredictions(
      client,
      "predictions",
      userId,
      {
        _id: -1,
      }
    );
    try {
      res.status(200).json({ pastPredictions: pastPredictions.slice(0, 3) });
    } catch (error) {
      res.status(500).json({ message: "Error inserting document" });
    }
  }
  client.close();
}
