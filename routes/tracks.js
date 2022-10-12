const express = require ("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const checkRol = require("../middleware/rol");
const authMiddleware = require("../middleware/session");
const {validatorCreateItem, validatorID} = require("../validators/tracks")
//const customHeader = require("../middleware/CustomHeader")


/////////////////////////////////////////////////////////////////////
/**
 * Ruta que lista todos los elementos
 */
router.get("/",authMiddleware,checkRol(['user']),getItems);
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
/**
 * Ruta que agrega un nuevo elemento 
 */
router.post("/", authMiddleware, checkRol(["user"]),validatorCreateItem,  createItem);
/////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////
/**
 * Ruta para ver un elemento en particular de la lista 
 */
 router.get("/:id", authMiddleware, validatorID, getItem);
////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
/**
 * Ruta para actualizar un elemento en particular de la lista 
 */
 router.put("/:id", authMiddleware, validatorCreateItem, validatorID, updateItem);
////////////////////////////////////////////////////////////////////////




/**
 * Ruta para borrar un elemento en particular de la lista 
 */
 router.delete("/:id",authMiddleware, validatorID, deleteItem );


module.exports = router;