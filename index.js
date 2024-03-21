require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(mongoString);
        console.log(`mongoDB connected : ${conn.connection.host}`);
    } catch(error){
        console.log(error);
        process.exit(1)
    }
}


const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');
const port = process.env.PORT || 5500;

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


connectDB().then(() => {
    app.listen(port, ()=> {
        console.log("let's go for request yeah")
    })
});