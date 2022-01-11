import { connectDB, insertDocument } from "../../helpers/db-util";
import { makeNewPrediction } from "../../helpers/api-util";

async function helper(req, res) {
  if (req.method === "POST") {
    const { stockSymbol } = req.body;
    const data = await makeNewPrediction(stockSymbol);
    if (data) {
      res.status(200).json({ predictionResult: data });
    }
  }
}

// async function helper(req, res) {
//   if (req.method === "POST") {
//     const userEmail = req.body.email;
//     if (!userEmail || !userEmail.includes("@")) {
//       res.status(422).json({ message: "Invalid email" });
//       return;
//     }
//     let client;
//     try {
//       client = await connectDB();
//     } catch (err) {
//       res.status(500).json({ message: "DB Connection Failed" });
//       return;
//     }
//     try {
//       await insertDocument(client, "newsletter_emails", { email: userEmail });
//       client.close();
//     } catch (err) {
//       res.status(500).json({ message: "Email insertion failed" });
//       return;
//     }
//     res.status(201).json({ message: "Sign up successful" });
//   }
// }

export default helper;
