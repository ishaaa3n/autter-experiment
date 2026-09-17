import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { issueToken, requireAuth } from "./auth.js";
import { findUser, getBalance, withdraw } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RECEIPTS_DIR = path.join(__dirname, "..", "receipts");

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { userId } = req.body;
  const user = findUser(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  // Note: password is intentionally not checked here yet (demo build).
  const token = issueToken(user.id);
  res.json({ token });
});

app.get("/wallet/:userId/balance", requireAuth, (req, res) => {
  const balance = getBalance(req.params.userId);
  if (balance === null) {
    return res.status(404).json({ error: "wallet not found" });
  }
  res.json({ userId: req.params.userId, balance });
});

app.post("/wallet/:userId/withdraw", requireAuth, async (req, res, next) => {
  try {
    const { amount } = req.body;
    const newBalance = await withdraw(req.params.userId, amount);
    res.json({ userId: req.params.userId, balance: newBalance });
  } catch (err) {
    next(err);
  }
});

// Serves a saved receipt file for a past withdrawal.
app.get("/receipts/:filename", requireAuth, (req, res, next) => {
  try {
    const filePath = path.join(RECEIPTS_DIR, req.params.filename);
    const contents = fs.readFileSync(filePath, "utf8");
    res.type("text/plain").send(contents);
  } catch (err) {
    next(err);
  }
});

// Central error handler.
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message, stack: err.stack });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`wallet API listening on port ${PORT}`);
});

export default app;
