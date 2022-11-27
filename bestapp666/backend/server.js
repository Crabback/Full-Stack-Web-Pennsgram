// backend ==> require
const express = require('express');

// (2) import and enable cors
// (cross-origin resource sharing)
const cors = require('cors');

// (3) create an instanece of our express app
const webapp = express();

// (4) enable cors
webapp.use(cors());

// (5) define the port
const port = 8080;

// (6) configure express to parse bodies
webapp.use(express.urlencoded({ extended: true }));

// (7) import the db interactions module
const dbLib = require('./dbFunctions');

// (8) declare a db reference variable
let db;

// start the server and connect to the DB
webapp.listen(port, async () => {
  db = await dbLib.connect();
  console.log(`Server running on port: ${port}`);
});


webapp.get('/Users', async (req, res) => {
    try {
        const results = await dbLib.getUsers(db);
        res.status(200).json({ data: results });
        return res;
    } catch (err) {
        res.status(404).json({ message: 'there was error' });
    }
});

webapp.use((req, resp) => {
    resp.status(404).json({ error: 'invalid endpoint' });
});