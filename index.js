const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const app = express();
const PORT = process.env.PORT || 3000
const routes = require('./routes/routes');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(mongoString);
        console.log(`connected on ${conn.connection.host}`)
    } catch(error){
       console.log(error);
       process.exit(1);
    }
}

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
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
    app.listen(PORT, ()=> {
        console.log(`listening on ${PORT}`)
    })
});