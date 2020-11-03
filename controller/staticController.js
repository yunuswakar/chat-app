const staticModel = require('../model/staticModel');
const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/messages')
const { SuccessMessage } = require('../helper/messages')
const { ErrorCode } = require('../helper/statusCodes')
const { SuccessCode } = require('../helper/statusCodes')
/**
    * Function Name :staticContent
    * Description   : Get the static content type wise
    *
    * @return response
    */

const staticContent = (req,res) =>{
    staticModel.findOne({type:req.params.contentType},(error,staticContentDetails) =>{
        if(error){
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }else if(!staticContentDetails){
            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
        }else{
            response(res, SuccessCode.SUCCESS, staticContentDetails, SuccessMessage.DETAIL_GET);

        }
    })
}


const updateStaticContent = (req,res) =>{

    staticModel.findOneAndUpdate({"_id":req.body.staticId},req.body,{new:true},(err,result)=>{
        if(err){
            response(res, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
        }else if(!result){
            response(res, ErrorCode.NOT_FOUND, [], ErrorMessage.NOT_FOUND);
        }else{
            response(res, SuccessCode.SUCCESS, result, "Static content updated successfully");

        }
    })

}
const addFaq = (req, res) => {
    let obj = {};
    staticModel.findOne({
        type:req.params.contentType
    }).exec((err, succ) => {
        if (err)
            return res.send({ responseCode: 500, responseMessage: "Internal server error.", err })
        else if (!succ) {
            return res.send({ responseCode: 404, responseMessage: "Data not found" })
        } else {
 
            staticModel.findOneAndUpdate({
                "_id": req.body._id
            }, {
                    $push: {
                        "FAQ": {
                            "question": req.body.question,
                            "answer": req.body.answer,
                            "category": req.body.category
                        }
                    }
                }, {
                    new: true
                },
                (error, result) => {
                    if (error)
                        return res.send({ responseCode: 500, responseMessage: "Internal server error.", error })
                    else if (!result)
                        return res.send({ responseCode: 404, responseMessage: "Data not found" })
                    else
                        return res.send({ responseCode: 200, responseMessage: "Faq content added Successfully", result });
                })
        }
    })
 }
 

 
 const viewFaq = (req, res) => {
    staticModel.findOne({
        "FAQ._id": req.body._id,
        'status': "ACTIVE",
        "type": "FAQ"
    }, {
            "FAQ.$._id": 1
        },
        (err1, success) => {
            if (err1)
                return res.send({ responseCode: 500, responseMessage: "Internal server error.", err1 })
            else if (!success)
                return res.send({ responseCode: 404, responseMessage: "Data not found" })
            else
                return res.send({ responseCode: 200, responseMessage: "Data found successfully", result })
        })
 }

const updateFaq = (req, res) => {
    staticModel.findOne({
        'Type': 'FAQ'
    }).exec((err, succ) => {
        if (err)
            return global_fn.responseHandler(res, 400, err);
        else {
            console.log("<<<<<<<<<<<<<<<<662>>>>>>>>>>", succ);
            staticModel.findOneAndUpdate({
                "FAQ._id": req.body._id
            }, {
                    $set: {
                        "FAQ.$": {
                            "_id": req.body._id,
                            "question": req.body.question,
                            "answer": req.body.answer,
                            "category": req.body.category
                        }
                    }
                }, {
                    new: true
                },
                (error, result) => {
                    console.log("@@@@@@@@@", error, result)
                    if (error){
                       console.log("Faq updated")
                    }
                    else{
                        console.log("FAQ updated")
                    }
                    
                })
        }
    })
}
module.exports ={
    staticContent ,
    updateStaticContent,
    addFaq,
    viewFaq,
    updateFaq


    
}