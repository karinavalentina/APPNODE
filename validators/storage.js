const {check} = require ("express-validator");
const validationResults = require("../utils/handlevalidator")


const validatorID = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validationResults(req,res,next)
    }
];

module.exports = {validatorID}