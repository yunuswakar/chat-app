const express = require('express')
const bodyParser = require("body-parser");
const config = require('./config/config')
const db = require('./dbconnections/mongodb')
const index = require('./routes/indexRoute')
const app = express()
const morgan = require('morgan');
const cors=require('cors')
const path = require("path");

app.use(cors());

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var swaggerDefinition = {
  info: {
    title: 'PixalApp',
    version: '2.0.0',
    description: 'Documentation of Pixal Application',
  },
  host: `${global.gConfig.swaggerURL}`,
  basePath: '/',
};
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*/*.js']
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);


});

// initialize swagger-jsdoc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

///////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan('dev'))

app.use('/api/v1', index)

// app.use(express.static(path.join(__dirname, 'public/dist/innerPurposeAdmin')));
// app.get('*', (req, res) => {
// res.sendFile(__dirname + '/public/dist/innerPurposeAdmin/index.html')
// });


app.listen(global.gConfig.node_port, function () {

  console.log("Server is listening on", global.gConfig.node_port)

})



