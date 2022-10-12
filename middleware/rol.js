const { handleHttpError } = require("../utils/handleErrors");

const checkRol = (roles) => (req, res, next) =>{
try {
 const { user } = req;
 const rolesByUser = user.role;
 const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
 if (!checkValueRol){
    handleHttpError(res, "USER NOT PERMISSIONS", 403)
    return;
 }
 next()

}

catch (e) {
 handleHttpError(res,"ERROR" ,403)
 console.log(e)
}
}
module.exports = checkRol