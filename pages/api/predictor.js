import { connectDB, insertDocument } from "../../helpers/db-util";
import { makeNewPredictionMock } from "../../helpers/api-util";

async function helper(req, res) {
  if (req.method === "POST") {
    const data = await makeNewPredictionMock();
    res.status(200).json(data);
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
