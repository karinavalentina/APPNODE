const express = require ("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/storage")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const {validatorID} = require("../validators/storage")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol");

/////////////////////////////////////////////////////////////////////
/**
 * Ruta que lista todos los elementos
 */
router.get("/",authMiddleware,checkRol(["user"]),getItems);
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
/**
 * Ruta que muestra un solo elemento 
 */
router.get("/:id",authMiddleware,checkRol(["user"]), validatorID, getItem);
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
/**
 * Ruta que agrega un nuevo elemento 
 */
router.post("/", authMiddleware, checkRol(["admin", "user"]),uploadMiddleware.single("myfile"),createItem);
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
/**
 * Ruta que actualiza un elemento ya existente
 */
router.put("/:id", validatorID, authMiddleware, checkRol(["user"]),  updateItem);
/////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////
/**
 * Ruta que borra un elemento 
 */
router.delete("/:id",validatorID, authMiddleware, checkRol(["user"]), deleteItem);
/////////////////////////////////////////////////////////////////////


module.exports = router;