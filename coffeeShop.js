const readline = require("readline");
var clc = require("cli-color");

const { stdin: input, stdout: output } = require("process");

const rl = readline.createInterface({ input, output });

const menus = [
  {
    iteamName: "Regular Coffee",
    iteamPrice: 30,
  },
  {
    iteamName: "Black coffee",
    iteamPrice: 50,
  },
  {
    iteamName: "Latte",
    iteamPrice: 100,
  },
  {
    iteamName: "Americano",
    iteamPrice: 130,
  },
  {
    iteamName: "Expresso",
    iteamPrice: 150,
  },
];

const orders = [];

function totalBill() {
  let total = orders.reduce(
    (sum, ele) => sum + ele.Quantity * ele.iteamPrice,
    0
  );
  return total;
}

function getBill() {
  console.log(clc.greenBright("Bill"));
  console.table(orders);
  console.log(
    `${clc.greenBright(
      `Your bill amount is Rs.${totalBill()}`
    )} \n${clc.redBright("Please pay the bill...")}`
  );

  setTimeout(() => {
    console.log(clc.yellowBright("Your Order Is Preparing Please Wait...."));
    setTimeout(() => {
      console.log(
        clc.greenBright("Your order is Ready! \nThank You \nVisit Again!")
      );
      rl.close();
    }, 5000);
  }, 2000);
}

function placeOrder(iteamNumber) {
  console.log(`You have ordered ${clc.yellow(menus[iteamNumber].iteamName)}!`);

  orders.push({ ...menus[iteamNumber], Quantity: 1 });

  rl.question(
    `${clc.blue("Please enter quantity of")} ${clc.yellow(
      menus[iteamNumber].iteamName
    )}! \n`,
    (quantity) => {
      const orderQty = orders.find(
        (ele) => ele.iteamName === menus[iteamNumber].iteamName
      );
      orderQty.Quantity = Number(quantity);
      rl.question(
        clc.blue("Do you want to add some more orders : (Y/N) \n"),
        (input) => {
          if (input === "Y" || input === "y") {
            console.log(clc.yellowBright("Menu card \n"));
            console.table(menus);
            coffeeOrder();
          } else if (input === "N" || input === "n") {
            getBill();
          }
        }
      );
    }
  );
}

function coffeeOrder() {
  rl.question(
    `${clc.blue("Enter iteam number to order")} \nor press ${clc.red(
      "X"
    )} to exit \n`,
    (iteamNumber) => {
      if (iteamNumber === "X" || iteamNumber === "x") {
        console.log(clc.magenta("Thank You.. \nVisit again.."));
        rl.close();
      } else {
        if (Number(iteamNumber) < menus.length && Number(iteamNumber) > -1) {
          placeOrder(Number(iteamNumber));
        } else {
          console.log(
            clc.red("You entered worng iteam number, \nPlease Enter Again!")
          );
          console.table(menus);
          coffeeOrder();
        }
      }
    }
  );
}

function showMenu() {
  console.log(clc.blue("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*- \n"));
  console.log(clc.yellowBright("____Welcome to Cafe Royale____ \n"));
  console.log(clc.blue("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*- \n"));
  console.log(clc.yellowBright("Menu card \n"));
  console.table(menus);
  coffeeOrder();
}

showMenu();
