const _ = require('lodash'); 
const config = require('./config.json');
const defaultConfig = config.staging;
const environment = process.env.NODE_ENV || 'development';
//const environment = process.env.NODE_ENV || 'staging';

const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;

