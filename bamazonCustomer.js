// All npms
const mysql = require("mysql");

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
  console.log("connected as id " + connection.threadId + "\n");
  start();
})

// function that will show user products avaible and ask for id of product they would like to buy

start = () => {
  showAllProducts();
  
}

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


