const multiparty = require('multiparty');
const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/messages')
const { ErrorCode } = require('../helper/statusCodes')

module.exports.appParsing = (req, res, next) => {
    try {
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
             console.log(req);
            if (err) { throw err; }
            req.body= fields;
            // req
            req.locals = {};
            req.locals['fields'] = fields;
            req.locals['files'] = files;

            //req.body = fields;
            req.assert('firstName', 'first name is required').notEmpty()
            req.assert('lastName', 'first name is required').notEmpty()
            req.assert('middleName', 'first name is required').notEmpty()
            req.assert('email', 'email is required').notEmpty()
            req.assert('userId', 'userId is required').notEmpty()
           // req.assert('countryCode', 'countryCode is required').notEmpty()
            req.assert('mobileNumber', 'mobileNumber is required').notEmpty()


            
            var errors = req.validationErrors();
            if (errors) {
                response(res, ErrorCode.BAD_REQUEST, [], ErrorMessage.FIELD_REQUIRED);
            } else {
                console.log('files--> ' + JSON.stringify(files))
                next();
            }

        });
    } catch (err) {
        next(err);
    }
}