// src/app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let students = [];


app.post('/students', (req, res) => {
  const student = req.body;
  students.push(student);
  res.status(201).send('Student added successfully');
});


app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const updatedStudent = req.body;
  let student = students.find(stu => stu.id === studentId);

  if (student) {
    Object.assign(student, updatedStudent);
    res.send('Student updated successfully');
  } else {
    res.status(404).send('Student not found');
  }
});


app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex(stu => stu.id === studentId);

  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    res.send('Student deleted successfully');
  } else {
    res.status(404).send('Student not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
 