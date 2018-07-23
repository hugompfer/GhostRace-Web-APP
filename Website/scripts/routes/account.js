const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../db/dbConnector');
const server = require('../server');

/**
 * Função para retornar a pessoa logada.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/', (req, res) => {
    user = req.session.user;
    if (user)
        res.json(user);
    else
        res.status(404).send();
});

/**
 * Função para atualizar a informação de a pessoa logada.
 * @param {*} req 
 * @param {*} res 
 */
router.put('/', (req, res) => {
    user = req.session.user;
    if (user) {
        var sql = mysql.format("update Utilizador set username=?,pw=?, dataNascimento=?, pais=?, email=? where idUtilizador=?", [req.body.username, req.body.password,
        new Date(req.body.birthDate), req.body.country, req.body.email, req.session.user.idUtilizador]);
        let query = db.query(sql, (err, result) => {
            if (err) throw res.json({ success: false, message: err });;
            req.session.user.username=req.body.username;
            req.session.user.pw=req.body.password;
            req.session.user.dataNascimento=req.body.birthDate;
            req.session.user.pais=req.body.country;
            req.session.user.email=req.body.email;
            req.session.user.idUtilizador=req.body.id;
            res.json(result);
        });
    }
});

/**
 * Função para fazer o logout a pessoa logada.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/logout', (req, res) => {
    if ( req.session.user){
        req.session.user=undefined;
        res.status(200).send();
    }else
        res.status(404).send();
});



/*
router.post('/', (req, res) => {
    let sql=mysql.format('SELECT idUtilizador FROM Utilizador where username= ?',req.body.username);
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length==0){
            res.json({success: false, message: "username not found"});
        }else{
            let sql='SELECT * FROM Utilizador where idUtilizador='+result[0].idUtilizador+' and pw='+req.body.password;
            let query = db.query(sql, (err, result) => {
            if(err) throw err;
                if(result.length==0){
                    res.json({success: false, message: "password incorrect"});
                }else{
                    res.json({success: true, user: result[0]});
                }
            });
        }
    });
});
*/
module.exports = router;