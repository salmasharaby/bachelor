const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();


app.use(cors());
app.use(bodyParser.json());
//Connect to db
const db = process.env.DB_CONNECT
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true , useFindAndModify: false  })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


//Import Routes
const authRoute = require('./routes/auth');

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server Up and runinng'));

