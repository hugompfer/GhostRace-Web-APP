const express = require('express');
const router= express.Router();
const mysql = require('mysql');
const db = require('../db/dbConnector');

/**
 * Função para retornar a lista de tipo de estatisticas.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/', (req, res) => {
    let sql=mysql.format('SELECT * FROM tipoestatistica');
    let query = db.query(sql, (err, result) => {
        if(err) throw res.json({success: false, message: err});;
        res.json({success: true, statisticsType: result});
    });
});

module.exports=router;