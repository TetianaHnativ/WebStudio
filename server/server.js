require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const router = require('./routes/index.js');
const ServiceModel = require('./models/service.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js')
//DataBase
const PORT = process.env.PORTS || 5000;

//Root
const app = express();
app.use(express.static('public'));
app.set('views', path.join(__dirname, '..','public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Get roters
app.use(router);
app.use(errorMiddleware);

//Static files
app.get('/', async (req, res) => {
  try {
    const categories = await ServiceModel.distinct('category');
    const isAuthenticated = req.cookies.refreshToken;
    const username = req.cookies.username;
    res.render('../public/index', { categories, isAuthenticated, username});
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/portfolio', (req, res) => {
  const isAuthenticated = req.cookies.refreshToken;
  const username = req.cookies.username;
  res.render('../public/portfolio', {isAuthenticated, username});
});

app.get('/auth', (req, res) => {
  res.render('../public/auth');
});


app.use((req, res) => {
  res.status(404).render('../public/error')
});


//Start server
async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log("Server start on port " + PORT));
    } catch(e) {
        console.log(e);
    }
}

startApp();