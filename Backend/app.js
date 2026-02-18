const express = require('express');
require('dotenv').config();
const { db } = require('./db/db')
const cors = require('cors');
const { readdirSync } = require('fs');

const app = express();
const port = process.env.PORT || 5000;

//mongoose connection (non-blocking)
console.log("DEBUG: Calling db() from app.js");
db().catch(err => console.error("DEBUG: Database initialization failed catch:", err));
console.log("DEBUG: db() call initiated");

//middleware
app.use(express.json());
app.use(cors());
//routes
readdirSync('./routers').map((route) => { app.use('/api/v1', require('./routers/' + route)) })



app.listen(port, () => {
    console.log("You are listening to the port no.:", port);
});
