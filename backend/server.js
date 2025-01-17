const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


dotenv.config();
require("dotenv").config();

connectDB();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("hello1");
})

app.get('/chat', (req, res) => {
    res.send(chats);
})

app.use('/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`Server running at ${PORT}`));