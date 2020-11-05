const express = require('express');
const app = express();
const config = require('./config/config');
const db = require('./dbConnectivity/mongodb');
const index = require('./routes/indexRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const swaggerJSDoc = require('swagger-jsdoc');
var cron = require('node-cron');
const myCron=require('./cronFunction/cronFunction')


const swaggerDefinition = {
  info: {
    title: 'LightHouse',
    version: '1.0.0',
    description: 'Swagger API Docs',
  },
  host: `${global.gConfig.swaggerURL}`,
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*/*.js'], // <-- not in the definition, but in the options
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {

  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//************************************************************************************* */
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(bodyParser.json({ limit: "50mb" }))

app.use(morgan('dev'))

app.use('/api/v1', index)

//***********************CRON FUNCTION ****************************//
// cron.schedule('*/5 * * * * *', () => {
//   console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.couponExpiry()
// })

// cron.schedule('*/10 * * * * *', () => {
//   console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.couponExpiryNotification()
// })

// cron.schedule('0 8 * * *', () => {
//   console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.creditNotification()
// })


cron.schedule('*/25 * * * * *', () => {
  console.log("Cron is running for payment >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
myCron.paymentStatus()
})

cron.schedule('*/10 * * * * *', () => {
  console.log("Cron is running for Recharge payment >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
myCron.rechargeStatus()
})
// cron.schedule('0 8 * * *', () => {
//   console.log("Cron is running for payment >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.inactivateRetailers()
// })
// cron.schedule('0 8 * * *', () => {
//   console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.inactivatingRetailerNotification()
// })
// cron.schedule('*/10 * * * * *', () => {
//   console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.inactivateUsers()
// })

// cron.schedule('*/10 * * * * *', () => {
//   console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.inactiveUser()
// })
// cron.schedule('*/10 * * * * *', () => {
//   console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
// myCron.deleteExpiredCouponWeekly()
// })
cron.schedule('*/10 * * * * *', () => {
  console.log("Cron is running >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
myCron.weeklyEmailTemplate()
})
app.listen(global.gConfig.node_port, () => {
  console.log("Server is running on", global.gConfig.node_port)
})



