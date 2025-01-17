const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
dotenv.config();

connectDB();
app.get('/', (req, res) => {
    res.send("hello1");
})

app.get('/chat', (req, res) => {
    res.send(chats);
})

const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`Server running at ${PORT}`));