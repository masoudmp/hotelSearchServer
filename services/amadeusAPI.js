const Amadeus = require("amadeus"); //I used amadeus library here as it was suggested in amadeus documentation
let amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

module.exports.hotelAPI = function(checkInDate, checkOutDate, cityCode) {
  let options = {
    cityCode: cityCode,
    adults: 1,
    view: "LIGHT",
    sort: "PRICE",
    bestRateOnly: true,
    lang: "EN",
    checkInDate: checkInDate,
    checkOutDate: checkOutDate
  };
  try {
    return amadeus.client.get(
      "https://test.api.amadeus.com/v2/shopping/hotel-offers",
      options
    );
  } catch (err) {
    return err;
  }
};
