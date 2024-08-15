const express = require("express");
const mysql = require('mysql');
const bodyParser = require("body-parser");
const moment = require('moment-timezone');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db1'
});

con.connect((err) => {
    if (!err) console.log("DB Connected");
    else console.log("DB not connected");
});

app.post("/insert", (req, res) => {
    console.log(req.body);
    const { un, pass } = req.body;

    const sql = "INSERT INTO Student (Username, Pass) VALUES (?, ?)";
    const values = [un, pass];
    console.log(values);
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to insert data into the database" });
        }
        console.log("Data inserted into the database");
        return res.send({ success: true });
    });
});


app.post("/check", (req, res) => {
    const { un, pass } = req.body;

    const sql = "SELECT * FROM Student WHERE Username = ? AND Pass = ?"; 
    const values = [un, pass];

    con.query(sql, values, (err, result) => {
       console.log(result[0].Role);
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch data from the database" });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid email/mobile or password" });
        }
        console.log("Valid Data");
        return res.json({ success: true,role:result[0].Role });
    });
});

app.post("/insertLockedDates", (req, res) => {
    const { start, end, title, un } = req.body;

    console.log(start);
    console.log(end);

   const  start1 = moment.tz(start, 'Asia/Kolkata').toDate();
   const end1 = moment.tz(end, 'Asia/Kolkata').toDate();
   console.log(start1);
   console.log(end1);

   
    const sql = "INSERT INTO LockedDates (StartDate, EndDate, Title, Username) VALUES (?, ?, ?, ?)";
    const values = [start, end, title, un];

   
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to insert locked dates into the database" });
        }
        console.log("Locked dates inserted into the database");
        return res.send({ success: true });
    });
});

//student
app.post("/checkLockedDates", (req, res) => {
    const { un } = req.body;

    const sql = "SELECT * FROM LockedDates WHERE Username = ?";
    const values = [un];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch dates from the database" });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "No locked dates found" });
        }
        return res.json({ success: true, lockedDates: result });
    });
});

app.post("/insertTeacher", (req, res) => {
    console.log(req.body);
    const { un, pass } = req.body;

    const sql = "INSERT INTO Teacher (Username, Pass) VALUES (?, ?)";
    const values = [un, pass];
    console.log(values);
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: "Failed to insert data into the database" });
        }
        console.log("Data inserted into the database");
        return res.send({ success: true });
    });
});




app.post("/checkTeachDates", (req, res) => {
    const { un } = req.body;

    const sql = "SELECT * FROM LockedDates";
    const values = [un];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch dates from the database" });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "No locked dates found" });
        }
        return res.json({ success: true, lockedDates: result });
    });
});

app.post("/checkTeacher", (req, res) => {
    const { un, pass } = req.body;

    const sql = "SELECT * FROM Teacher WHERE Username = ? AND Pass = ?"; 
    const values = [un, pass];

    con.query(sql, values, (err, result) => {
        console.log(result);
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to fetch data from the database" });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid email/mobile or password" });
        }
        console.log("Valid Data");
        return res.json({ success: true });
    });
});

app.post("/updateStatus", (req, res) => {
    const { start, end, title, un } = req.body;

    const sql = "UPDATE LockedDates SET Title = ? WHERE StartDate = ? AND EndDate = ? ";
    const values = [title, start, end, un];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to update status in the database" });
        }
        console.log("Status updated successfully");
        return res.json({ success: true });
    });
});


const server = app.listen(8081, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});
