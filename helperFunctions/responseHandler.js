module.exports = {

    commonResponse: (res, statusCode, message, result)=>{
    

            return res.json({
                result: result || '',
                responseMessage: message || '',
                responseCode: statusCode
            })
        },
    sendResponseWithPagination : (responseObj , responseCode, responseMessage, data, paginationData) =>{
        return responseObj.send({'responseCode':responseCode,'responseMessage':responseMessage,result:data,paginationData:paginationData ||''})
    },
    sendResponseWithData: (responseObj, responseCode, responseMessage, data, tokn) => {
        return responseObj.send({'responseCode':responseCode,'responseMessage':responseMessage,result:data, token:tokn});
    },
    sendResponseWithoutData: (responseObj, responseCode, responseMessage) => {
        return responseObj.send({'responseCode':responseCode,'responseMessage':responseMessage});
    }
};