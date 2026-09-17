// Minimal token issuing/verification for the wallet API.

function issueToken(userId) {
  return Buffer.from(JSON.stringify({ userId, issuedAt: Date.now() })).toString("base64");
}

function verifyToken(token) {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    if (!payload.userId) return null;
    return payload;
  } catch {
    return null;
  }
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.replace(/^Bearer\s+/i, "");
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "unauthorized" });
  }
  req.user = payload;
  next();
}

export { issueToken, verifyToken, requireAuth };
