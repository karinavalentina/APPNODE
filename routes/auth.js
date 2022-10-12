const express = require ("express");
const router = express.Router();
const {validatorRegister, validatorLogin} = require("../validators/auth")
const { RegisterCtrl, loginCtrl } = require("../controllers/auth");
const authMiddleware = require("../middleware/session");

/////////////////////////////////////////////////////////////////////
/**
 * Ruta que agrega un nuevo elemento 
 */
router.post("/register", validatorRegister, RegisterCtrl);
router.post("/login", validatorLogin, loginCtrl);

/////////////////////////////////////////////////////////////////////









module.exports = router;