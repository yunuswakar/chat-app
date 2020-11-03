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


const swaggerDefinition = {
  info: {
    title: 'KNOW IT APP',
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



var FCM = require('fcm-push');

var serverKey = 'AAAAlL551Z0:APA91bEu84eiRAYIIVbELzcSe3802bybzsLfvFFijnn70SPeL73EloXgRBZaRHPUGRwqbUMdP7r3ZEQ7GyEWyxMauILeZJJmBn-1z3TjCxMx1KcW95rtAc_486cEOE6FVLf9_bG1kYeO';
var fcm = new FCM(serverKey);

var message = {
    to: 'c4m1-9IVSA-p4CGZPKTdO4:APA91bE5uagW8kCD23DBo5tuer08UhL_W4yxjwC3qLVgAPTtQJl2kSq4V_LK85KR3UtpKEoX6P3AMDim7gSuAvb_7-gB3oeyk9mfGT_1LySVWUooyEiE4NaUG0tJc1qCpbcdc2VspAO8', // required fill with device token or topics
    collapse_key: 'your_collapse_key', 
    // data: {
    //     your_custom_data_key: 'your_custom_data_value'
    // },

    notification: {
        title: 'Knowit',
        body: 'Sandeep sigh Patient Name has given you test report access.'
    }
};
app.get('/test', function (req, res) {
  let flag = 0;
  for(let i=0 ;i<=100;i++){
 console.log("loop==>",i)
    fcm.send(message,(err,resp) =>{
        console.log("FCM SEND-->",i,err,resp)
        if(i==100){
            return res.send('Hello World')
        }
    })
    
}
   
})

app.listen(global.gConfig.node_port, () => {
  console.log("Server is running on", global.gConfig.node_port)
})



