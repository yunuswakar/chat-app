var mongoose = require('mongoose')
const schema = mongoose.Schema;
var mongoosePaginate = require("mongoose-paginate");

var booking = new schema({
  customerName: {
    type: String
  },
  customerId: {
    type: String
  },
  packageDetails:[],
  flightDetails:[],
  sightDetails:[],
  transferDetails:[],
  hotelDetails:[],
  passengerDetails:[],
  email: {
    type: String,
  },
  bookingModule: {
    type: String
  },
  countryId: {
    type: String,
    ref: "country"
  },
  destinationId: {
    type: String,
    ref: "contentDestination"
  },
  bookingDate: {
    type: String
  },
  travelDate: {
    type: String
  },
  returnDate: {
    type: String
  },
  amount: {
    type: String
  },
  bookingStatus: {
    type: String,
    enum: ["PAID", "UNPAID"]
  },
  status: {
    type: String,
    enum: ["ACTIVE", "BLOCK", "DELETE"],
    default: "ACTIVE"
  }

}, { timestamps: true });

booking.plugin(mongoosePaginate)
module.exports = mongoose.model("booking", booking)