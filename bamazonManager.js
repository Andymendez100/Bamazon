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
});

start = () => {
    inquirer
        .prompt([{
            name: "choice",
            type: "rawlist",
            choices: ["View Products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

        }]).then(answer => {
            console.log(answer.choice);

            switch (answer.choice) {
                case "View Products for sale":
                    showAllProducts();
                    break;
                case "View Low Inventory":
                   showLowInventory();
                    break;

                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;

                default:
                    console.log("Error not working");
                    start();
                    break;
            }

        });
}


// Showing all products available
showAllProducts = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        console.log("Items Avaliable: ");
        console.log("-----------------------------------");
        for (let i = 0; i < res.length; i++) {
            console.log(`Item Id: ${res[i].item_id}`);
            console.log(`Product Name: ${res[i].product_name}`);
            console.log(`Price: $${res[i].price}`);
            console.log(`Stock Quantity: ${res[i].stock_quantity}`);
            console.log("-----------------------------------");
        }
        console.log('All items displayed \n');
    });
}

showLowInventory = () =>{
    connection.query("SELECT * FROM products", (err, res) =>{
        console.log("\nLow Inventory: ");
        console.log("-----------------------------------");

        for (let i = 0; i < res.length; i++) {
           if( res[i].stock_quantity <= 5){
            console.log(`Item Id: ${res[i].item_id}`);
            console.log(`Product Name: ${res[i].product_name}`);
            console.log(`Price: $${res[i].price}`);
            console.log(`Stock Quantity: ${res[i].stock_quantity}`);
            console.log("-----------------------------------");
           }
        }

    });
}

// Function to add more item 
 addToInventory = () => {
    connection.query("SELECT * FROM products", function (err, results) {
      // Asking the user what item they would like and how many they want
      inquirer
        .prompt([{
          name: "item",
          type: "rawlist",
          choices: () => {
            // Putting all options from the database into an array
  
            let choiceArray = [];
            let nameArray = [];
  
            for (let i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id);
             // nameArray.push(results[i].product_name);
            }
            // Showing those options back to the user
            return choiceArray;
          },
          message: "What is the product you would like to add more of?"
        }, {
          name: 'quantity',
          type: 'input',
          message: 'How many units of this product would you like to add? '
        }]).then(answer => {
            console.log(answer.quantity);
            
          // Saving the infomation of the user's chosen id
  
          let chosenItem;
          for (let i = 0; i < results.length; i++) {
            if (results[i].item_id  === answer.item) {
              chosenItem = results[i];
            }
          }
          // Making the user's input into a number
            answer.quantity = parseInt(answer.quantity)
            // Updating Database
            connection.query('UPDATE products SET ? WHERE ?', [{
              stock_quantity: chosenItem.stock_quantity + answer.quantity
            }, {
              item_id: answer.item
            }],
               (error) => {
                if (error) throw err;
                console.log(`Inventory was succesfully updated`);
              }
            )
        })
    })
}

addNewProduct = () => {
    inquirer
        .prompt([{
          name: "newItem",
          type: "Input",
          message: "What is the product you would like to add?"
        },
         {
            name: 'department',
            type: 'input',
            message: 'What department does it belong to?'
  
         },
         {
            name: 'price',
            type: 'input',
            message: 'What is the price of the item you would like to add?'
  
         },  
        {
          name: 'itemQuantity',
          type: 'input',
          message: 'How many units of this product do you have to add?'

        }]).then(answer => {    
            connection.query('INSERT INTO products set ?',[{
                product_name: answer.newItem,
           
                department_name: answer.department,
            
                price: answer.price,
           
                stock_quantity:answer.itemQuantity,
            }]
            )

            console.log('Item was added Successfully');
            
        })
}