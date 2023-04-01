import express from "express";
import mongoose from "mongoose";

const PORT = 5000;

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json('Server work');
})

app.listen(PORT, () => console.log("Server start on port" + PORT));