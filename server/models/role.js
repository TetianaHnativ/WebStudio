const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    value: {
        type: String, unique: true, default: "USER"
    },
});

const RoleModel = mongoose.model('Role', RoleSchema);

module.exports = RoleModel;