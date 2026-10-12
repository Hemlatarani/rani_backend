const express = require("express");
const { getCompanyDetails } = require("../../controllers/web/companyController");
const webcompanyRoutes = express.Router();


webcompanyRoutes.get("/details", getCompanyDetails);

module.exports = {webcompanyRoutes};