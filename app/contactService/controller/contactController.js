/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

"use strict";

const CONTACT = require('../model/contactModel')// import user model to perform crud operation
const mongoose = require("mongoose");// set rules for mongoose id
const constant = require("../../../helpers/constant"); // some constant value 
const responseMessage = require("../../../helpers/responseMessages");// for static response message
const setResponseObject = require("../../../helpers/commonFunctions")// for common functions used on some files
    .setResponseObject;
const mailer = require("../../../helpers/nodeMailer")
const _contact = {};


//Conatct Admin
_contact.contactAdmin = async (req, res) => {
    try {
        let data = req.body;
        data.contactBy = req.userId
        let result = await CONTACT.create(data)
        res.status(200).send({
            success: true,
            message: responseMessage.VERIFICATION('Contact Admin'),
            data: result
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
}
//Get by Id
_contact.getById = async (req, res) => {
    try {
        let result = await CONTACT.findOne({ _id: req.params.id }).populate('contactBy', '-password')
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Record')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

//Delete One Category By Id
_contact.deleteById = async (req, res) => {
    try {
        let result = await CONTACT.findByIdAndRemove({ _id: req.params.id })
        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Record')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DELETE('Record'),
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

//Get Listing
_contact.getListing = async (req, res) => {
    try {
        let pageNo = parseInt(req.query.pageNo);
        let pageSize = parseInt(req.query.pageSize) || 10;
        let result = await CONTACT.aggregate([
            {
                $lookup: {
                    from: "users",
                    let: { contactBy: "$contactBy" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$contactBy"] } } },
                    ],
                    as: 'contact'
                },
            },
            
             {
                $match: { $or: [{ "contact.firstName": { $regex: req.query.keywords, $options: 'i' } }, { "contact.lastName": { $regex: req.query.keywords, $options: 'i' } },{ "contact.userName": { $regex: req.query.keywords, $options: 'i' } },{ "contact.email": { $regex: req.query.keywords, $options: 'i' } },{ "contact.phoneNo": { $regex: req.query.keywords, $options: 'i' } }] }
            },
            {
                $unwind: {
                    path: '$contact'
                }
            },
            { $group: { _id: null, data: { $push: "$$ROOT" }, myCount: { $sum: 1 } } },
            { $sort: { "createdAt": -1 } },
            { $skip: pageSize * (pageNo - 1) },
            { $limit: pageSize },

        ])

        if (!result) {
            res.status(400).send({
                success: false,
                message: responseMessage.RECORD_NOTFOUND('Listing')
            })
            return
        }
        res.status(200).send({
            success: true,
            message: responseMessage.DATA_FOUND,
            data: result
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

_contact.sendReplyToUser = async (req, res) => {
    try {
        let data = req.body
        let result = await mailer.sendMail(data.to, data.subject, data.html, data.message)
        if (!result) {
            throw (responseMessage.ERRORON_SENDMAIL, next());
        } else {
            await setResponseObject(req, true, responseMessage.SUCCESS('email sent'), '');
            next();
        }
    } catch (err) {
        await setResponseObject(req, false, err.message ? err.message : responseMessage.SOMETHING_WRONG, "");
        next();
    }
}

module.exports = _contact;