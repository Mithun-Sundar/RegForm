const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Spms@2002",
    database: "testform"
});

app.post('/', async(req, res) => {
    const { stdid, name, dob, email } = req.body;
    const val = [stdid, name, dob, email];
    try {
        const k = await db.query("insert into students (stdid,name,dob,email) values (?)", [val]);
    } catch (err) {
        console.error(err);
    }
    res.json({ msg: "success" })
});

app.get('/', async(req, res) => {
    try {
        const k = await db.query("select stdid,name,DATE_ADD(dob, INTERVAL 1 DAY) as dob,email from students order by stdid", (err, results, fields) => {
            res.json(results);
        });
    } catch (err) {
        console.log.error(err.message);
    }
});

app.listen(3000, (req, res) => {
    console.log("Server running");
})