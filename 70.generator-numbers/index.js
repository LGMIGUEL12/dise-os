function getRandom() {
  let start = document.getElementsByClassName("start")[0].value;
  let end = document.getElementsByClassName("end")[0].value;
  document.getElementsByClassName("number")[0].innerHTML =
    "The random number is: " +
    "<br>" +
    getRandomBetween(parseInt(start), parseInt(end));
}

function getRandomBetween(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
