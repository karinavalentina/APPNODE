const { usersModel } = require("../models")
const {handleHttpError} = require("../utils/handleErrors")
const {matchedData, check} = require("express-validator");
const {tokenSign} = require ("../utils/handlejwt")
const {encrypt} = require ("../utils/handlePassword");
const { compare } = require("bcryptjs");
const ENGINE_DB = process.env.ENGINE_DB


const RegisterCtrl =  async (req,res)=> {
    try {
    req = matchedData(req)
    const password = await encrypt(req.password);
    const body = {...req, password};
    const dataUser = await usersModel.create(body);
    //dataUser.set("password", undefined, {strict:false})
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }
    res.send({data});
}
       
catch (e){
    handleHttpError(res, "ERROR REGISTER USER")
    console.log(e)
    console.log(usersModel)
}}


const loginCtrl = async (req, res) => {
try {
    req = matchedData(req)

const user = (ENGINE_DB === "nosql") ? await usersModel.findOne({email:req.email}).select("password") : await usersModel.findOne({where: {email:req.email}})
    
    if(!user){
        handleHttpError(res, "USER_NOT_EXIST", 404)
        return
    }

const hashPassword = user.get("password");
const check = await compare(req.password, hashPassword)

if (!check){
    handleHttpError(res, "PASSWORD INVALID", 401)
    console.log(e)
    return
    
}
user.set("password", undefined, {strict : false})

const data = {
    token: await tokenSign(user),
    user
}
 res.send({data})


}
catch(e){
    handleHttpError(res, "ERROR LOGIN USER",404)
    console.log(e)

}
}

    module.exports = {RegisterCtrl, loginCtrl}


