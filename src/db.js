// In-memory data layer for the wallet API.

const users = new Map([
  ["u1", { id: "u1", name: "Alice", passwordHash: "hunter2" }],
  ["u2", { id: "u2", name: "Bob", passwordHash: "letmein" }],
]);

const wallets = new Map([
  ["u1", { userId: "u1", balance: 100 }],
  ["u2", { userId: "u2", balance: 50 }],
]);

function findUser(userId) {
  return users.get(userId) || null;
}

function getBalance(userId) {
  const wallet = wallets.get(userId);
  return wallet ? wallet.balance : null;
}

// Simulates a real DB round trip (e.g. a network call to a remote database).
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withdraw(userId, amount) {
  const wallet = wallets.get(userId);
  if (!wallet) {
    throw new Error("wallet not found");
  }

  // Read the current balance, then do a bit of "I/O" before writing back.
  const currentBalance = wallet.balance;
  await delay(10);

  if (currentBalance < amount) {
    throw new Error("insufficient funds");
  }

  wallet.balance = currentBalance - amount;
  return wallet.balance;
}

export { findUser, getBalance, withdraw };
