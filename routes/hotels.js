const express = require("express");
const validateHotelRequest = require("../middlewares/validateHotelRequest");
const router = express.Router();
const hotels = require("../services/hotels");

router.get("/", validateHotelRequest, (req, res) => {
  hotels
    .searchAvailability(req.query.checkIn, req.query.checkOut, req.query.code)
    .then(result => {
      res.status(result.statusCode).send(result);
    });
});

module.exports = router;
