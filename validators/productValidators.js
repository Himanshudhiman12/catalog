var Joi = require('joi');
var logging = require('../../logging/logging');
var validator = require('../../validators/validator');


exports.deleteProductsValidation = deleteProductsValidation;


function deleteProductsValidation(req, res, next) {
    var schema = Joi.object().keys({
        user_access_token : Joi.string().required(),
        product_id        : Joi.number().required(),
        parent_id         : Joi.number().required()
    });
    Joi.validate(_.extend(req.body, _.pick(req.headers, 'authorization')), schema, { 
        presence: 'required' 
        }, (err, value) => { 
        joiResponse(err, value, req, resp, next); 
    });
}

function joiResponse(err, value, req, resp, next) {
    if (err) {
        resp.json({
            message: "PARAMETER_MISSING",
            status: 201,
            data: err.details[0].message.replace(/["]/ig, ''),
        });
    } else {
        req.body = value;
        next();
    }
} 
