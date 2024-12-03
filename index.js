//===SERVER===//
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "finaldb",
});


connection.connect();
const port = 3000;


app.use(express.json());


app.get("/students", (req, res) => {
  connection.query("SELECT * FROM students", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});


app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    `SELECT * FROM students WHERE id=${id}`,
    (err, rows, fields) => {
      if (err) throw err;
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(400).json({ msg: `${id} id not found` });
      }
    }
  );
});


app.use(express.urlencoded({ extended: false }));
app.post("/students", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const grade = req.body.grade;
  connection.query(
    `INSERT INTO students (name, email, grade) VALUES ('${name}', '${email}', '${grade}')`,
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully inserted` });
    }
  );
});


app.use(express.urlencoded({ extended: false }));
app.put("/students", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const grade = req.body.grade;
  const id = req.body.id;
  connection.query(
    `UPDATE students SET name='${name}', email='${email}' , grade='${grade}' WHERE id='${id}'`,
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully updated!` });
    }
  );
});


app.use(express.urlencoded({ extended: false }));
app.delete("/students", (req, res) => {
  const id = req.body.id;
  connection.query(
    `DELETE FROM students WHERE id='${id}'`,
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully deleted` });
    }
  );
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});