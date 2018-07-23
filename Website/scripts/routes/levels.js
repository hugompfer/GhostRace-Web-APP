const express = require('express');
const router= express.Router();
const mysql = require('mysql');
const db = require('../db/dbConnector');

/**
 * Função para retornar a lista de niveis.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/', (req, res) => {
    let sql=`SELECT idNivel FROM nivel`;
    let query = db.query(sql, (err, result) => {
        if(err) throw res.json({success: false, message: err});;
        res.json({success: true, levels: result});
    });
});

module.exports=router;