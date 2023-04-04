const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Contact = require('./model/contact.js');

const PORT = 5000;
const DB_URL = `mongodb+srv://localhost:root@webstudio.4yjossz.mongodb.net/?retryWrites=true&w=majority`;



const app = express();
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'portfolio.html'));
});

app.post('/', async (req, res) => {
  try {
    const { name, phone, email, comment } = req.body;
    const contact = await Contact.create({ name, phone, email, comment });
    console.log(req.body);
    res.json(contact);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'public', 'error.html'));
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