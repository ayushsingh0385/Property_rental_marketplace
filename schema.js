const Joi=require("joi");

module.exports.listingSchema=Joi.object({
    text:Joi.string().required(),
    des:Joi.string().required(),
    location:Joi.string().required(),
    country:Joi.string().required(),
    price:Joi.number().min(1).required(),
    imageUpload:Joi.string().allow("",null)
}).required();

module.exports.reviewSchema=Joi.object({
        comment:Joi.string().required(),
        rating:Joi.number().min(1).max(5).required()
}).required();