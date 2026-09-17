function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

console.log("add(2, 3) =", add(2, 3));
console.log("subtract(5, 2) =", subtract(5, 2));
console.log("multiply(4, 3) =", multiply(4, 3));
console.log("divide(10, 2) =", divide(10, 2));

export { add, subtract, multiply, divide };
