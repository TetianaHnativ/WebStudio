const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const router = require('./routes/index.js');
const ServiceModel = require('./models/service.js');

//DataBase
const PORT = 5000;
const DB_URL = `mongodb+srv://localhost:root@webstudio.4yjossz.mongodb.net/?retryWrites=true&w=majority`;

//Root
const app = express();
app.use(express.static('public'));
app.set('views', path.join(__dirname, '..','public'));
app.set('view engine', 'ejs');
app.use(express.json());

//Get roters
app.use(router);

//Static files
app.get('/', async (req, res) => {
  try {
    const categories = await ServiceModel.distinct('category');
    res.render('../public/index', { categories });
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get('/portfolio', (req, res) => {
  res.render('../public/portfolio');
});

app.use((req, res) => {
  res.status(404).render('../public/error')
});


//Start server
async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log("Server start on port " + PORT));
    } catch(e) {
        console.log(e);
    }
}

startApp();