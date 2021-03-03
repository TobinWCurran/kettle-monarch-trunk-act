import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import nodeClicked from './nodeClicked.js';
import initialize from './initialize.js';


const app = new express;
const clientPort = 8000;
const port = 8080;

const corsOptions = {
    'origin': `http://localhost:${clientPort}`,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(json());

app.get('/', (req, res) => {
    res.header();
    res.send('This is the API for a turn-based line game.');
});

app.get('/initialize', function (req, res) {
    res.json(initialize());
});

app.post('/error', function (req, res) {
    res.json('eror');
});

app.post('/node-clicked', function (req, res) {
    res.json(nodeClicked(req));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});