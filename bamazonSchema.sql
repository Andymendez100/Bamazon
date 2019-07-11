ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Hihihi10';

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) ,
  department_name varchar(45),
  price decimal (10,2),
  stock_quantity INT(45),
  primary key(item_id)
);

INSERT INTO products(product_name, Department_name, price, stock_quantity)

VALUES("xbox","electronics",200.40, 10),
("ps4","electronics",300.00, 2),
("yeezys","Shoes",300.99, 15),
("monster hunter world for xbox1","Video Games",59.99, 20),
("foundation","Beauty",20.99, 4),
("hot cheetos","groceries",4.59, 40),
("apple watch","electronics",199.99, 30),
("drone","electronics",1199.00, 3),
("backpack","school",50.00, 25),
("bike","outdoor",1500.00, 10);

select * from products