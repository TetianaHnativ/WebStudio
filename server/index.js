const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ContactModel = require('./models/contact.js');
const ServiceModel = require('./models/service.js');
const OrderModel = require('./models/order.js')

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
    const contact = await ContactModel.create({ name, phone, email, comment });
    console.log(req.body);
    res.json(contact);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post('/service', async (req, res) => {
  try {
    const { category, name } = req.body;
    const service = await ServiceModel.create({ category, name });
    console.log(req.body);
    res.json(service);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post('/orders', async (req, res) => {
  try {
    const { lastName, firstName, phone, email, serviceId } = req.body;
    const service = await ServiceModel.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    const order = await OrderModel.create({
      lastName,
      firstName,
      phone,
      email,
      service: service._id
    });
    res.json(order);
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