const express = require ("express")
const fs = require ("fs")
const router = require("express").Router();

const PATH_ROUTES = __dirname;

const remove = (fileName) => {
    return fileName.split('.').shift()
}

fs.readdirSync(PATH_ROUTES).filter((file)=>{
    const name = remove(file)
    if (name !== 'index'){
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router 
