CREATE DATABASE IF NO EXISTS modamarket;
USE modamarket;

CREATE TABLE products(
id int primary key auto_increment,
nombre varchar(50) not null,
descripcion varchar(150) not null,
marca varchar (30) not null,
precio double not null,
promociones double not null,
talla char(2) not null,
color varchar(30) not null,
imagen varchar(100) not null,
categoria varchar (50) not null
);

INSERT INTO products (nombre, descripcion, marca, precio, promociones, talla, color, imagen, categoria) 
VALUES ('Camiseta', 'Camiseta de algodón con estampado floral', 'Zara', 25.99, 0, 'M', 'Blanco', 'https://static.owayo-cdn.com/newhp/img/productSelection/st2020_whi_250x281.png', 'Camisetas');

