// Check out my website!
// https://the-best-codes.github.io/?codepen

function toggle(element) {
  element.classList.toggle("clicked");
  if (element.classList.contains("clicked")) {
    document.getElementById("textInner").style.display = "block";
    setTimeout(() => {
      document.getElementById("textInner").style.opacity = "1";
    }, 100);
    createConfetti();
  } else {
    document.getElementById("textInner").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("textInner").style.display = "none";
    }, 300);
  }
}

function createConfetti() {
  // Create a canvas element and get its context
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  // Define the emoji shape
  const emojiShape = confetti.shapeFromText({
    text: "❤️", // You can use any emoji here
    scalar: 3
  });
  // Call the confetti function with the emoji shape and other options
  confetti({
    particleCount: 225, // You can change the number of confetti particles
    scalar: 3, // Make it a bit larger
    angle: 90, // You can change the angle of the confetti launch
    spread: 360, // You can change the spread of the confetti launch
    startVelocity: 25, // You can change the initial velocity of the confetti particles
    decay: 0.95, // You can change the decay rate of the confetti particles
    shapes: [emojiShape], // You can pass an array of shapes to use as confetti particles
    origin: {
      x: 0.5,
      y: 0.4
    }, // You can change the origin of the confetti launch
    zIndex: -1 // You can change the z-index of the confetti canvas
  });
}