class Calculator {
  initialize = () => {
    this.currentValue = 0;
    this.nextValue = "";
    this.fn = this.add;
  };

  add = (currentVal, nextVal) => currentVal + nextVal;
  subtract = (currentVal, nextVal) => currentVal - nextVal;
  multiply = (currentVal, nextVal) => currentVal * nextVal;
  divide = (currentVal, nextVal) => currentVal / nextVal;

  executeOperation() {
    const { currentValue, nextValue } = this;
    const result = this.fn(parseFloat(currentValue), parseFloat(nextValue));
    if (result) {
      this.currentValue = result;
      this.nextValue = "";
    }
    this.render();
  }

  handleKey(key) {
    if (key === "Backspace") {
      this.nextValue = this.nextValue.slice(0, -1);
    }
    if (key === "Delete") {
      this.initialize();
    }
    if (key.includes("Digit") || !isNaN(key)) {
      this.nextValue = this.nextValue + key.replace("Digit", "");
    }
    if (key === ".") {
      this.nextValue = this.nextValue ? this.nextValue + "." : "0.";
    }
    if (key === "Enter") {
      this.executeOperation();
    }
    if (["+", "-", "*", "/"].includes(key)) {
      this.executeOperation();
      switch (key) {
        case "+":
          this.fn = this.add;
          break;
        case "-":
          this.fn = this.subtract;
          break;
        case "*":
          this.fn = this.multiply;
          break;
        case "/":
          this.fn = this.divide;
          break;
      }
    }
    this.render();
  }

  bindEvents() {
    document.addEventListener("keydown", (e) => {
      let key;
      if (e.shiftKey) {
        key = e.key;
      } else {
        key = e.code;
      }
      key && this.handleKey(key);
    });
    document.addEventListener("click", (e) => {
      const key = e.target.dataset.key;
      key && this.handleKey(key);
    });
  }

  render() {
    const { currentValue, nextValue } = this;
    const screen = document.querySelector("#screen > p");
    const newValue = nextValue ? nextValue : currentValue;
    screen.innerText = Math.round(newValue * 10 ** 6) / 10 ** 6;
  }

  static create() {
    const calculator = new this();
    calculator.initialize();
    calculator.bindEvents();
    return calculator;
  }
}
