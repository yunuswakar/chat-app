
/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */

"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;
const validator = require("validator");


const crystal = new schema({
    crystalName: {
        type: String,
        default: ""
    },
    crystalImg: [
        String
    ],
    raw_thumbnail_image:{
        type: String
    },
    brain:{
        type: String,
        default:"0"
    },
    rawImage:{
        type: String
    },
    polished_thumbnail_image:{
        type: String
    },
    polishedImage:{
        type: String
    },
    description: {
        type: String,
        default: ""

    },
    knownAs: {
        type: String,
        default: ""
    },
    knownFor: {
        type: String,
        default: ""

    },
    physical: Array,
    primaryChakra: Array,
    secondaryChakra: Array,
    spiritual: Array,
    rarity: {
        type: String,
        default: ""

    },
    color: Array,
    chemicalComposition: {
        type: String,
        default: ""

    },
    mineralClass: Array,
    crystalSystem: {
        type: String,
        default: ""

    },
    astrologicalSign: Array,
    ethicalSourced: {
        type: String,
        default: ""

    },
    hardness: {
        type: String,
        default: ""

    },
    location: Array,
    numericalVibration: Array,
    pronunciation: {
        type: String,
        default: ""
    },
    affirmation: {
        type: String,
        default: ""
    }, 
    viewCrystal: {
        type: String,
        default: ""
    },
    crystalLink:{
        type: String,
        default: ""
    },
    emotional: Array,
    alternateStoneName: Array,
}, { timestamps: true });

module.exports = mongoose.model("crystalLibrary", crystal);