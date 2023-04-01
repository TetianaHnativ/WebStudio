import mongoose from "mongoose";

const Contact = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    comment: {type: String}
});

const ContactModel = mongoose.model('Contact', Contact);

export default ContactModel;