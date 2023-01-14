import * as mysql from "mysql2";
import ProductList from "./interfaces/productlist";

export default class SQLqueries {
    readonly connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: '1234',
            database: 'shopping',
            port: 3306
        });
        this.connection.connect(function(err: any){
            if (err) return console.error('error: ' + err.message);
            console.log('Connected to Shopping Database');
        });
        this.connection.query(`CREATE TABLE IF NOT EXISTS Products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(40) NOT NULL,
            price DOUBLE NOT NULL,
            sale_unit VARCHAR(10) DEFAULT 'Qty',
            division VARCHAR(20) NOT NULL,
            sub_division VARCHAR(20),
            manufacturer VARCHAR(40) DEFAULT 'Home made',
            supplier VARCHAR(40),
            description VARCHAR(100),
            tags VARCHAR(100),
            stock BOOL DEFAULT 1
        )`);
    }// end of constructor

    addProducts(products: ProductList[]) {
        products.map(product => {
            this.connection.query(`INSERT INTO Products (
                name, price, sale_unit, division, sub_division, 
                manufacturer, supplier, description, tags
            ) VALUES (
                '${product.name}',
                ${product.price},
                '${product.sale_unit ?? 'Qty'}',
                '${product.division}',
                '${product.sub_division ?? ''}',
                '${product.manufacturer ?? 'Home made'}',
                '${product.supplier ?? ''}',
                '${product.description ?? ''}',
                '${product.tags ?? ''}'
            );`);
        }); 
    }// enf of insertProducts

    getAllProducts() { return this.connection.promise().query(`SELECT * FROM Products`); }

    deleteAllProducts() { return this.connection.promise().query(`DELETE FROM Products`); }
}