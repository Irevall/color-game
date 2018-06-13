document.addEventListener("DOMContentLoaded", function() {
  let levels = document.querySelectorAll(".level");
  let level = 3 * (1 + Array.from(levels).indexOf(document.querySelector(".selected")));
  let squares = document.querySelectorAll(".square");
  let colorDisplay = document.querySelector("#colorDisplay");
  let resultDisplay = document.querySelector("#result");
  let resetButton = document.querySelector("#reset");
  let correctId = -1;
  let correctColor = "";
  removingUnwanted()
  randomColors()

  for (let i = 0; i < levels.length; i++) {
    levels[i].addEventListener("click", function() {
      if ((i + 1) * 3 == level) {
        return false;
      }
      document.querySelector(".selected").classList.remove("selected");
      levels[i].classList.add("selected");
      level = 3 * (i + 1);
      removingUnwanted();
      reRoll();
    });
  }

  function removingUnwanted() {
    for (let i = 0; i < squares.length; i++) {
      if (i < level) {
        squares[i].style.display = "block";
      } else {
        squares[i].style.display = "none";
      }
    }
  }

  resetButton.addEventListener("click", function() {
    reRoll();
  });

  function reRoll() {
    randomColors();
    document.querySelector("h1").style.backgroundColor = "#232323";
    resultDisplay.textContent = "";
    resetButton.textContent = "New Colors";
  };

  function randomColors() {
    let newColors = [];
    let i = 0;
    while (newColors.length!=level) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      let color = "rgb(" + r + ", " + g + ", " + b  + ")";
      if (newColors.includes(color)) {
        continue;
      } else {
        changingColor(squares[i], color, 50*i);
        newColors.push(color);
        i++;

      }
    }
    correctId = Math.floor(Math.random() * level);
    correctColor = newColors[correctId];
    colorDisplay.textContent = correctColor;
  }

  function changingColor(where, what, time) {
    setTimeout(function() {
      where.style.backgroundColor = what;
    }, time);
  }

  function afterWinning() {
    let badSquares = Array.from(squares);
    badSquares.splice(correctId, 1);
    document.querySelector("h1").style.backgroundColor = correctColor;
    for (let i=0; i<badSquares.length; i++) {
      changingColor(badSquares[i], correctColor, 50*i);
    }
  }


  for (let i=0; i<squares.length; i++) {
    squares[i].addEventListener("click", function() {
      if (this.style.backgroundColor==correctColor) {
        resultDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        afterWinning();
      } else {
        this.style.backgroundColor = "#232323";
        resultDisplay.textContent = "Try again";
      }
    });
  }
});
