/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
'use strict';

const mongoose = require("mongoose"); // import mongoose for set by of schema
const SCHEMA = mongoose.Schema;
const VALIDATOR = require("validator"); // for check email validators


const FAVORITE =mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'       
    },
    favBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:Boolean,
        default: true
    },
    isFav:{
        type:Boolean,
        default: false
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})
module.exports= mongoose.model('Favorite',FAVORITE)