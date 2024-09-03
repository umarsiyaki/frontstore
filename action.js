
// Import required modules
const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Database connection settings
const dbHost = 'localhost';
const dbUser = 'username';
const dbPassword = 'password';
const dbName = 'oladayo_enterprises';

// Connect to the database
const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// Middleware to parse JSON bodies
app.use(express.json());

// Login function
app.post('/login', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  db.query(`SELECT * FROM users WHERE phoneNumber = ? OR email = ? OR username = ?`, [phoneNumber, email, username], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error logging in' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          const token = jwt.sign({ userId: (link unavailable) }, 'secretkey');
          res.send({ message: 'Logged in successfully', token });
        } else {
          res.status(401).send({ message: 'Invalid password' });
        }
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    }
  });
});

// Register function
app.post('/register', (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const middleName = req.body.middleName;
  const address = req.body.address;
  const age = req.body.age;
  const educationalBackground = req.body.educationalBackground;
  const image = req.body.image;
  const NIN = req.body.NIN;
  const town = req.body.town;
  const country = req.body.country;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.query(`INSERT INTO users (username, firstName, surname, middleName, address, age, educationalBackground, image, NIN, town, country, phoneNumber, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [username, firstName, surname, middleName, address, age, educationalBackground, image, NIN, town, country, phoneNumber, email, hashedPassword], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error registering' });
    } else {
      res.send({ message: 'User registered successfully' });
    }
  });
});

// Add cashier function
app.post('/addCashier', (req, res) => {
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const middleName = req.body.middleName;
  const address = req.body.address;
  const phone = req.body.phone;
  const email = req.body.email;
  const town = req.body.town;
  const country = req.body.country;
  const age = req.body.age;
  const education = req.body.education;
  db.query(`INSERT INTO cashiers (firstName, surname, middleName, address, phone, email, town, country, age, education) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [firstName, surname, middleName, address, phone, email, town, country, age, education], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error adding cashier' });
    } else {
      res.send({ message: 'Cashier added successfully' });
    }
  });
});

// Add product function
app.post('/addProduct', (req, res) => {
  const productName = req.body.productName;
  const price = req.body.price;
  const description = req.body.description;
  const vendorName = req.body.vendorName;
  const size = req.body.size;
  const quantities = req.body.quantities;
  const image = req.body.image;
  db.query(`INSERT INTO products (productName, price, description, vendorName, size, quantities, image) VALUES (?, ?, ?, ?, ?, ?, ?)`, [productName, price, description, vendorName, size, quantities, image], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error adding product' });
    } else {
      res.send({ message: 'Product added successfully' });
    }
  });
});

// Update product function
app.post('/updateProduct', (req, res) => {
  const productId = req.body.productId;
  const productName = req.body.productName;
  const price = req.body.price;
  const description = req.body.description;
  const vendorName = req.body.vendorName;
  const size = req.body.size;
  const quantities = req.body.quantities;
  const image = req.body.image;
  db.query(`UPDATE products SET productName = ?, price = ?, description = ?, vendorName = ?, size = ?, quantities = ?, image = ? WHERE id = ?`, [productName, price, description, vendorName, size, quantities, image, productId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error updating product' });
    } else {
      res.send({ message: 'Product updated successfully' });
    }
  });
});

// Delete product function
app.post('/deleteProduct', (req, res) => {
  const productId = req.body.productId;
  db.query(`DELETE FROM products WHERE id = ?`, [productId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error deleting product' });
    } else {
      res.send({ message: 'Product deleted successfully' });
    }
  });
});

// Message function
app.post('/sendMessage', (req, res) => {
  const receiverId = req.body.receiverId;
  const senderId = req.body.senderId;
  const messageBody = req.body.messageBody;
  db.query(`INSERT INTO messages (receiverId, senderId, messageBody) VALUES (?, ?, ?)`, [receiverId, senderId, messageBody], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error sending message' });
    } else {
      res.send({ message: 'Message sent successfully' });
    }
  });
});

// Get messages function
app.get('/getMessages', (req, res) => {
  const userId = req.query.userId;
  db.query(`SELECT * FROM messages WHERE receiverId = ? OR senderId = ?`, [userId, userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error getting messages' });
    } else {
      res.send(results);
    }
  });
});

// Edit profile function
app.post('/editProfile', (req, res) => {
  const userId = req.body.userId;
  const username = req.body.username;
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const middleName = req.body.middleName;
  const address = req.body.address;
  const age = req.body.age;
  const educationalBackground = req.body.educationalBackground;
  const image = req.body.image;
  db.query(`UPDATE users SET username = ?, firstName = ?, surname = ?, middleName = ?, address = ?, age = ?, educationalBackground = ?, image = ? WHERE id = ?`, [username, firstName, surname, middleName, address, age, educationalBackground, image, userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error editing profile' });
    } else {
      res.send({ message: 'Profile edited successfully' });
    }
  });
});

// Edit inventory function
app.post('/editInventory', (req, res) => {
  const productId = req.body.productId;
  const quantities = req.body.quantities;
  db.query(`UPDATE products SET quantities = ? WHERE id = ?`, [quantities, productId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error editing inventory' });
    } else {
      res.send({ message: 'Inventory edited successfully' });
    }
  });
});

// Search products function
app.get('/searchProducts', (req, res) => {
  const query = req.query.query;
  db.query(`SELECT * FROM products WHERE productName LIKE ?`, [`%${query}%`], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error searching products' });
    } else {
      res.send(results);
    }
  });
});

// Get product details function
app.get('/getProductDetails', (req, res) => {
  const productId = req.query.productId;
  db.query(`SELECT * FROM products WHERE id = ?`, [productId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error getting product details' });
    } else {
      res.send(results[0]);
    }
  });
});

// Get user details function
app.get('/getUserDetails', (req, res) => {
  const userId = req.query.userId;
  db.query(`SELECT * FROM users WHERE id = ?`, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error getting user details' });
    } else {
      res.send(results[0]);
    }
  });
});

// Get cashier details function
app.get('/getCashierDetails', (req, res) => {
  const cashierId = req.query.cashierId;
  db.query(`SELECT * FROM cashiers WHERE id = ?`, [cashierId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error getting cashier details' });
    } else {
      res.send(results[0]);
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
