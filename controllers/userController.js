const sessionModel = require('../models/sessionModel');
const { commonResponse: response } = require('../helper/commonResponseHandler');
const { ErrorMessage } = require('../helper/message');
const { SuccessMessage } = require('../helper/message');
const { ErrorCode } = require('../helper/statusCode');
const { SuccessCode } = require('../helper/statusCode');
const API_KEY = "46790844"
const API_SECRET = "e1e7b3fd966b575ffdad2b24f19c188b8f6c8765"
const opentok = require('opentok')
const openTok = new opentok(API_KEY, API_SECRET);  

module.exports = {
    createSession: (req, res) => {
        openTok.createSession(function (err, session) {    
            if (err) {
                response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);    
            }
            else {
                var token = openTok.generateToken(session.sessionId)  
                var session_Details = {
                    "sessionId": session.sessionId,    
                    "token": token
                }
             new sessionModel(session_Details).save((error,sessionDetails)=>{  
                if (error) {
                    response(res, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);      
                }  
                else{
                response(res, SuccessCode.SUCCESS, sessionDetails, SuccessMessage.SESSION_CREATED);

                }  
             })                        
            }
        })
    },
}