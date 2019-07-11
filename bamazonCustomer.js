// All npms
const mysql = require("mysql");

const inquirer = require('inquirer');
// mysql npm connection
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,


  user: "root",

  password: "Hihihi10",
  database: "bamazon_db"
});

// connecting to mysql sever
connection.connect(err => {
  if (err) throw err;
  start();
})

// function that will show user products avaible and ask for id of product they would like to buy
start = () => {
  showAllProducts();
  connection.query("SELECT * FROM products", function (err, results) {
    // Asking the user what item they would like and how many they want
    inquirer
      .prompt([{
        name: "item",
        type: "rawlist",
        choices: () => {
          // Putting all options from the database into an array

          let choiceArray = [];

          for (let i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_id);
          }
          // Showing those options to the user
          return choiceArray;
        },
        message: "What is the id of the product you would like to buy?"
      }, {
        name: 'quantity',
        type: 'input',
        message: 'How many units would you like of this product? '
      }]).then(answer => {
        
        // Saving the infomation of the user's chosen id

        let chosenItem;
        for (let i = 0; i < results.length; i++) {
          if (results[i].item_id === answer.item) {
            chosenItem = results[i];
          }
        }
        // If user is trying to order more than what is in stock
        if (chosenItem.stock_quantity < answer.quantity) {
          console.log(`Insufficient quantity! All i have in stock is ${chosenItem.stock_quantity} `);

        } else {
          connection.query('UPDATE products SET ? WHERE ?', [{
            stock_quantity: chosenItem.stock_quantity - answer.quantity
          }, {
            item_id: answer.item
          }],
            function (error) {
              if (error) throw err;
              console.log(`Order was succesfully purchased`);
              console.log(`Your total is: $${chosenItem.price * answer.quantity}`);
            }
          )
        }
        connection.end();
      })
  })
};


// Showing all products available
showAllProducts = () => {
  connection.query("SELECT * FROM products", (err, res) => {
    console.log("Items Avaliable: ");
    console.log("-----------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log(`Item Id: ${res[i].item_id}`);
      console.log(`Product Name: ${res[i].product_name}`);
      console.log(`Price: $${res[i].price}`);
      console.log("-----------------------------------");
    }
  });
}