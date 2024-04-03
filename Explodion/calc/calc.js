var display = document.getElementById("output");
var buttons = document.getElementsByClassName("button");

Array.prototype.forEach.call(buttons, function(button) {
  button.addEventListener("click", function() {
    if (button.textContent != "=" && button.textContent != "C" && button.textContent != "×" && button.textContent != "÷" && button.textContent != "√" && button.textContent != "𝑥²" && button.textContent != "%" && button.textContent != "<=" && button.textContent != "+/-" && button.textContent != "sin" && button.textContent != "cos" && button.textContent != "tan" && button.textContent != "log" && button.textContent != "ln" && button.textContent != "^" && button.textContent != "n!" && button.textContent != "π" && button.textContent != "exp" && button.textContent != "radians" && button.textContent != "degrees") {
      display.value += button.textContent;
    } else if (button.textContent === "=") {
      equals();
    } else if (button.textContent === "C") {
      clear();
    } else if (button.textContent === "×") {
      multiply();
    } else if (button.textContent === "÷") {
      divide();
    } else if (button.textContent === "+/-") {
      plusMinus();
    } else if (button.textContent === "<=") {
      backspace();
    } else if (button.textContent === "%") {
      percent();
    } else if (button.textContent === "π") {
      pi();
    } else if (button.textContent === "𝑥²") {
      square();
    } else if (button.textContent === "√") {
      squareRoot();
    } else if (button.textContent === "sin") {
      sin();
    } else if (button.textContent === "cos") {
      cos();
    } else if (button.textContent === "tan") {
      tan();
    } else if (button.textContent === "log") {
      log();
    } else if (button.textContent === "ln") {
      ln();
    } else if (button.textContent === "^") {
      exponent();
    } else if (button.textContent === "n!") {
      factorial();
    } else if (button.textContent === "exp") {
      exp();
    } else if (button.textContent === "radians") {
      radians();
    } else if (button.textContent === "degrees") {
      degrees();
    }
  });
});

// function nextLine() {
//   if(display.value.length > 19) {
//     document.write("\n");
//   }
// }
// ***button functions***
function checkLength() {
  if (display.value.length >= 23) {
    display.value = "Overload Error";
  }
}
function syntaxError() {
  if (eval(display.value) == SyntaxError) {
    display.value = "Syntax Error";
  }
}
function equals() {
  if ((display.value).indexOf("^") > -1) {
    var base = (display.value).slice(0, (display.value).indexOf("^"));
    var exponent = (display.value).slice((display.value).indexOf("^") + 1);
    display.value = eval("Math.pow(" + base + "," + exponent + ")");
  } else {
    display.value = eval(display.value);
    checkLength();
    syntaxError();
  }
}
function clear() {
  display.value = "";
}
function backspace() {
  display.value = display.value.substring(0, display.value.length - 1);
}
function multiply() {
  display.value = display.value + "*";
}
function divide() {
  display.value = display.value + "/";
}
function plusMinus() {
  if (display.value.charAt(0) === "-") {
    display.value = display.value.slice(1);
  } else {
    display.value = "-" + display.value;
  }
}
function factorial() {
  var result = 1;
  if (display.value === 0) {
    display.value = "1";
  } else if (display.value < 0) {
    display.value = "undefined";
  } else {
    var result = 1;
    for (var i = display.value; i > 0; i--) {
      result = result * i;
    }
    display.value = result;
  }
}
function pi() {
  // if(display.value === "") {
  //   display.value = Math.PI;
  // }
  display.value = (display.value * Math.PI);
}
function square() {
  display.value = eval(display.value * display.value);
}
function squareRoot() {
  display.value = Math.sqrt(display.value);
}
function percent() {
  display.value = display.value / 100;
}
function sin() {
  display.value = Math.sin(display.value);
}
function cos() {
  display.value = Math.cos(display.value);
}
function tan() {
  display.value = Math.tan(display.value);
}
function log() {
  display.value = Math.log10(display.value);
}
function ln() {
  display.value = Math.log(display.value);
}
function exponent() {
  display.value = display.value + "^";
}
function exp() {
  display.value = Math.exp(display.value);
}
function radians() {
  display.value = display.value * (Math.PI / 180);
}
function degrees() {
  display.value = display.value * (180 / Math.PI);
}
