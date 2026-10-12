let mongoose = require("mongoose");

let companyAccountSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Mobilenumber: {
        type: String,
        required: true
    },

    Address: {
        type: String,
        required: true
    },

    MapUrl: {
        type: String,
    },

    imageLogo: {
        type: String,
        required: true,
    },

    Facebook: {
        type: String,
    },

    Youtube: {
        type: String,
    },

    Twitter: {
        type: String,
    },

    Instagram: {
        type: String,
    },

    whatsapp: {
        type: String,
    },
});

let companyAccountSchemaModel = mongoose.model(
    "companyAccount",
    companyAccountSchema,
    "companyaccount"
);

module.exports = { companyAccountSchemaModel };