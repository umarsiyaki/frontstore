
/* add your styles here */
/*JavaScript (product_calculator.js)*/

// import dependencies
const express = require('express');
const app = express();
const mysql = require('mysql');
const router = express.Router();

// database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
});

// model
const Product = {
  name: String,
  quantity: Number,
  price: Number,
  discount: Number
};

// controller
router.post('/calculate', (req, res) => {
  const { name, quantity, price, discount } = req.body;
  const product = new Product(name, quantity, price, discount);
  // perform calculation and store in database
  db.query(`INSERT INTO products SET ?`, product, (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error calculating product' });
    } else {
      res.send({ message: 'Product calculated successfully' });
    }
  });
});

// routes
app.use('/api', router);

// start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
