require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');
const port = process.env.PORT || 4400;

app.use('/api', routes)
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

const errorHandler = (err, req, res, next) => {
console.error(err)
res.status(500).json({error: "Erreur du serveur"})
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})