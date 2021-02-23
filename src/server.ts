import 'reflect-metadata';
import express from 'express';
import './database';

const app = express();

app.get("/", (req, res) => {
    return res.json({ message: "Hello word NLW#4" });
});

app.listen(3333, () => console.log("Server is running!"));
