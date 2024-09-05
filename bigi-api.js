
const express = require('express');
const app = express();
const mysql = require('mysql');

// Connect to the database
const db = mysql.createConnection({
host: 'localhost',
user: 'username',
password: 'password',
database: 'oladayo',
});

db.connect((err) => {
if (err) {
console.error('error connecting:', err);
return;
}
console.log('connected as id ' + db.threadId);
});

// API endpoint to get product details
app.get('/api/products/:id', (req, res) => {
const id = (link unavailable);
const query = 'SELECT * FROM products WHERE id = ?';
db.query(query, [id], (err, results) => {
if (err) {
console.error(err);
res.status(500).json({ success: false, message: 'Error fetching product' });
} else {
res.json({ success: true, product: results[0] });
}
});
});

// API endpoint to update product details
app.put('/api/products/:id', (req, res) => {
const id = (link unavailable);
const { name, price, size, quantity, image } = req.body;
const query = 'UPDATE products SET name = ?, price = ?, size = ?, quantity = ?, image = ? WHERE id = ?';
db.query(query, [name, price, size, quantity, image, id], (err, results) => {
if (err) {
console.error(err);
res.status(500).json({ success: false, message: 'Error updating product' });
} else {
res.json({ success: true, message: 'Product updated successfully' });
}
});
});

// API endpoint to get all products
app.get('/api/products', (req, res) => {
const query = 'SELECT * FROM products';
db.query(query, (err, results) => {
if (err) {
console.error(err);
res.status(500).json({ success: false, message: 'Error fetching products' });
} else {
res.json({ success: true, products: results });
}
});
});

// API endpoint to handle orders
app.post('/api/orders', (req, res) => {
const { productId, quantity } = req.body;
const query = 'INSERT INTO orders (product_id, quantity) VALUES (?, ?)';
db.query(query, [productId, quantity], (err, results) => {
if (err) {
console.error(err);
res.status(500).json({ success: false, message: 'Error placing order' });
} else {
res.json({ success: true, message: 'Order placed successfully' });
}
});
});

// API endpoint to get order receipt
app.get('/api/orders/:id/receipt', (req, res) => {
const id = ('bigi-cola');
const query = 'SELECT * FROM orders WHERE id = ?';
db.query(query, [id], (err, results) => {
if (err) {
console.error(err);
res.status(500).json({ success: false, message: 'Error fetching order receipt' });
} else {
res.json({ success: true, receipt: results[0] });
}
});
});

app.listen(3000, () => {
console.log('Bigi API listening on port 3000');
});