const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const DataSchema = require('./dataBase/index');

app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

app.post( '/transcation',  async(req, res) => {
    mongoose.connect(mongoURL);
    const { Price, Name, Date, Description } = req.body;
    const dataCreated = await DataSchema.create({
        price: Price,
        name: Name,
        date: Date,
        description: Description
    });
    res.status(200).send(dataCreated);
});

app.get( '/transcations',  async(req, res) => {
    mongoose.connect(mongoURL);
    const data = await DataSchema.find({});
    res.status(200).send(data);
});

app.delete( '/deletetranscations',  async(req, res) => {
    mongoose.connect(mongoURL);
    const data = await DataSchema.deleteMany({});
    res.status(200).send(data);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});