const amadeusAPI = require("./amadeusAPI");
// TODO: move this field to config file
const RESULT_LIMIT = 3; //Number of results to return

const transformResult = hotels => {
  if (hotels.length === 0) return [];
  hotels.length = hotels.length < RESULT_LIMIT ? hotels.length : RESULT_LIMIT;
  return hotels.map(item => {
    let newHotel = {};
    newHotel.price = {};

    newHotel.name = item.hotel.name;
    newHotel.address = item.hotel.address;
    newHotel.contact = item.hotel.contact;
    newHotel.price.currency = item.offers[0].price.currency;
    newHotel.price.total =
      item.offers[0].price.total || item.offers[0].price.base; //Some results from API has "total" field and some "base" field
    return newHotel;
  });
};

module.exports.searchAvailability = async function(
  checkInDate,
  checkOutDate,
  cityCode
) {
  try {
    let hotels = await amadeusAPI.hotelAPI(checkInDate, checkOutDate, cityCode);
    let response = {
      statusCode: 200,
      body: {}
    };
    response.body = transformResult(hotels.data);
    return response;
  } catch (err) {
    let customError = {};
    customError.statusCode = err.response.statusCode;
    customError.body = err.response.body;
    return customError;
  }
};
