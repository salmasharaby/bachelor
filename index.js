const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();


var Users = require('./routes/Users')



// Connect to Mongo
mongoose
    .connect('mongodb+srv://salma:salmas123@cluster0-llnce.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }) // Adding new mongo url parser
    .then(() => console.log("MongoDB Connected successfully"))
    .catch(err => console.log(err));
// Express body parser
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
// Cors
app.use(cors());
// Serve static assets if in production

// Entry point
app.get("/", (req, res) => res.send(`<h1>Welcome to Beat the QR app</h1>`));
// Use Routes
app.use('/users', Users)

// Wrong path
app.use((req, res) =>
    res.status(404).send(`<h1>Can not find what you're looking for</h1>`)
);
// Port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
