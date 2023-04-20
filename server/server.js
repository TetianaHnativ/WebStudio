const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const router = require('./routes/index.js');

const PORT = 5000;
const DB_URL = `mongodb+srv://localhost:root@webstudio.4yjossz.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use('/', router);

app.get('/', (req, res) => {
  res.render('../public/index')
});

app.get('/portfolio', (req, res) => {
  res.render('../public/portfolio');
});

app.use((req, res) => {
  res.status(404).render('../public/error')
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log("Server start on port " + PORT));
    } catch(e) {
        console.log(e);
    }
}

startApp();