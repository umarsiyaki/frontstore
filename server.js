
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

const express = require('express');
const app = express();
const formRouter = require('./form');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/forms', formRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
const db = new sqlite3.Database('database.db');

app.use(express.static('public'));

app.post('/submit-form', (req, res) => {
const formData = req.body;
db.run(`INSERT INTO forms (name, data, timestamp) VALUES (?, ?, ?)`, [
formData.name,
JSON.stringify(formData.data),
Date.now()
], (err) => {
if (err) {
console.error(err);
res.status(500).send({ message: 'Error submitting form' });
} else {
res.send({ message: 'Form submitted successfully' });
}
});
});

app.get('/get-form-data', (req, res) => {
db.all(`SELECT * FROM forms`, (err, rows) => {
if (err) {
console.error(err);
res.status(500).send({ message: 'Error fetching form data' });
} else {
res.send(rows);
}
});
});

app.post('/log-activity', (req, res) => {
const activityData = req.body;
db.run(`INSERT INTO activity (type, data, timestamp) VALUES (?, ?, ?)`, [
activityData.type,
JSON.stringify(activityData.data),
Date.now()
], (err) => {
if (err) {
console.error(err);
res.status(500).send({ message: 'Error logging activity' });
} else {
res.send({ message: 'Activity logged successfully' });
}
});
});

app.listen(3000, () => {
console.log('Server started on port 3000');
});