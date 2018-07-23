const express = require('express');
const router= express.Router();
const mysql = require('mysql');
const db = require('../db/dbConnector');
const server = require('../server');

/**
 * Função que permite fazer o login de uma pessoa.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.post('/', (req, res) => {
    let sql=mysql.format('SELECT * FROM Utilizador where username=? and pw=?',[req.body.username,req.body.password]);
    let query = db.query(sql, (err, result) => {
    if(err) throw res.json({success: false, message: err});;
    console.log(result[0])
       if(result[0]){
            req.session.user=result[0];
            res.status(200).send();
       }else{
        res.status(404).send();
       }   
    });
});



module.exports=router;