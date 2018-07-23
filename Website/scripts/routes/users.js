const express = require('express');
const router= express.Router();
const mysql = require('mysql');
const db = require('../db/dbConnector');
const server = require('../server');

/**
 * Função para retornar a lista de utilizadores.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/', (req, res) => {
    if(req.session.user){
        let sql='SELECT idUtilizador,username,dataNascimento,pais,email FROM Utilizador';
        let query = db.query(sql, (err, result) => {
            if(err) throw res.json({success: false, message: err});;
            res.json({success: true, user: result});
        });
    }else{
        res.status(401).send();
    }
        
});

/**
 * Função que permite atualizar um utilizador.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.put('/:id', (req, res) => {
    var sql = mysql.format("update Utilizador set username=?, dataNascimento=?, pais=?, email=? where idUtilizador=?",[req.body.username,new Date(req.body.birthDate),req.body.country,req.body.email,req.params.id]);
    let query = db.query(sql, (err, result) => {
        if(err) throw res.json({success: false, message: err});;
        res.json({success: true, user: result});
    });
});

/**
 * Função que permite remover um utilizador.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.delete('/:id', (req, res) => {
    var sql = mysql.format("Delete from Utilizador where idUtilizador=?",req.params.id);
    let query = db.query(sql, (err, result) => {
        if(err) throw res.json({success: false, err});;
        res.json({success: true, user: result});
    });
});

/**
 * Função para retornar um utilizador com um determinado id.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/:id', (req, res) => {
    let sql=mysql.format('SELECT * FROM Utilizador where idUtilizador=?',req.params.id);
    let query = db.query(sql, (err, result) => {
        if(err) throw res.json({success: false, err});
        res.json({success: true, user: result});
    });
});

/**
 * Função que permite criar um utilizador.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.post('/', (req, res) => {
    let sqll=mysql.format('select * from Utilizador where username=?',req.body.username);
    let query = db.query(sqll, (err, result) => {
        if(err) throw res.json({success: false, err});
        if(result.length==0){
            let sql=mysql.format('insert into Utilizador(username,dataNascimento,pw,pais,email)  values(?,?,?,?,?);',[req.body.username,new Date(req.body.birthDate),req.body.password,req.body.country,req.body.email]);
            let query2 = db.query(sql, (err, result) => {
                if(err) throw res.json({success: false, err});
                res.json(result);
            });
        }else{
            res.status(401).send();
        }
    });
    
});


module.exports=router;