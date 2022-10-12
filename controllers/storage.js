const fs = require("fs")
const { storageModel } = require("../models")
const { handleHttpError } = require("../utils/handleErrors")
const { matchedData } = require("express-validator");


const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * OBTENER LISTA DE LA BASE DE DATOS
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data });
    }
    catch (e) {
        handleHttpError(res, "ERROR GET ITEMS")
        console.log(e)
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
        const { id } = req;
        const data = await storageModel.findById(id);
        res.send({ data });
    }
    catch (e) {
        handleHttpError(res, "ERROR GET ITEMS")
    }
};


/**
 * INSERTAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const { body, file } = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({ data });
        console.log(data)
    }
    catch (e) {
        handleHttpError(res, "ERROR CREATE ITEMS")
        console.log(e)
    }
};

/**
 * 
 * ACTUALIZAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => { };


/**
 * BORRAR UN REGISTRO
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {

    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        await storageModel.deleteOne({ _id: id });
        //cambiar el deleteOne por delete para un soft delete
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath)

        data = {
            filePath,
            deleted: 1
        }
        res.send({ data });
    }

    catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR DELETE ITEM")
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }