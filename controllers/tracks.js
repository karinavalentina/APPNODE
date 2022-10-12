const { tracksModel } = require("../models")
const {handleHttpError} = require("../utils/handleErrors")
const {matchedData} = require("express-validator");
/**
 * OBTENER LISTA DE LA BASE DE DATOS
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const user = req.user;
        const data = await tracksModel.find({});

        //const data = await tracksModel.find({where:{id:>0}});
        res.send({ data, user });
    }
    catch(e){
        handleHttpError(res, "ERROR GET ITEMS")

    }
}; 


/**
 * OBTENER UN DETALLE
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {

    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.findById(id);
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR GET ITEM")

    }
}; 


/**
 * INSERTAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
 try {
const body = matchedData(req)
const data =  await tracksModel.create(body)
res.send({data})}
catch(e){
 handleHttpError(res, "ERROR CREATE ITEMS")
 console.log(e)
}
};



/**
 * ACTUALIZAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) =>  {
    try {
    const {id, ...body} = matchedData(req);
    const data =  await tracksModel.findOneAndUpdate(id, body);
    res.send({data, id, body})}
    catch(e){
     handleHttpError(res, "ERROR UPDATE ITEMS")
    }
    }; 


/**
 * BORRAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {

    try {
        req = matchedData(req);
        const {id} = req;
        const data = await tracksModel.deleteOne({_id:id});
        res.send({data});
        console.log(data)
    }
    catch(e){
        console.log(e)
        handleHttpError(res, "ERROR DELETE ITEM")
        

    }
}; 

module.exports = {getItems, getItem, createItem, updateItem, deleteItem }