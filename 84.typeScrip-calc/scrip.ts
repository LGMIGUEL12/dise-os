let operation1: string = "";
let operation2: string = "";
let operate: string;

function insert(event: Event): void {
  const x: string = (event.target as HTMLButtonElement).value;
  if (parseFloat(x) >= 0 && !operate) {
    operation1 = operation1 + x;
    document.getElementById("result")!.innerText = operation1;
  }

  if (operate && parseFloat(x) >= 0) {
    operation2 = operation2 + x;
    document.getElementById("result")!.innerText = operation2;
  }

  if (!parseFloat(x) && !operation2 && x !== "0") {
    operate = x;
    document.getElementById("result")!.innerText = operation1 + operate;
  }

  console.log("number 1", operation1);
  console.log("number 2", operation2);
  console.log("sign", operate);
}

function show(): void {
  if (operation1 && operate && operation2) {
    document.getElementById("result")!.innerText = calc().toString();
  }
  // multiplication by 0 function
  if (calc() && operate === "/" && operation2 === "0") {
    alert("This action cannot be executed");
  }
  //
  if (calc()) {
    operation1 = calc().toString();
    operation2 = "";
    operate = "";
  }
}
// value taker
function clean(): void {
  operation1 = "";
  operation2 = "";
  operate = "";
  document.getElementById("result")!.innerText = "";
}
// addition function
function add(): number {
  return parseFloat(operation1) + parseFloat(operation2);
}
// subtractions function
function subtract(): number {
  return parseFloat(operation1) - parseFloat(operation2);
}
// multiplication function
function multiply(): number {
  return parseFloat(operation1) * parseFloat(operation2);
}
// divisions function
function split(): number {
  return parseFloat(operation1) / parseFloat(operation2);
}

// function to execute
function calc(): number | undefined {
  switch (operate) {
    case "+":
      return add();
    case "-":
      return subtract();
    case "*":
      return multiply();
    case "/":
      return split();
    default:
      return undefined;
  }
}
