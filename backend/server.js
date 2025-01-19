const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
require("dotenv").config();

connectDB();

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Api is running successfully");
})

// app.get('/chat', (req, res) => {
//     res.send(chats);
// })

app.use('/user', userRoutes);

app.use('/chat', chatRoutes);

app.use('/messages', messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 

app.listen(PORT, console.log(`Server running at ${PORT}`));