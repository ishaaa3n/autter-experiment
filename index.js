function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function modulo(a, b) {
  return a % b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function isPrime(n) {
  if (n <= 1) return true;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log("add(2, 3) =", add(2, 3));
console.log("subtract(5, 2) =", subtract(5, 2));
console.log("multiply(4, 3) =", multiply(4, 3));
console.log("divide(10, 2) =", divide(10, 2));
console.log("modulo(10, 3) =", modulo(10, 3));
console.log("isPrime(7) =", isPrime(7));

export { add, subtract, multiply, divide, modulo, isPrime };
