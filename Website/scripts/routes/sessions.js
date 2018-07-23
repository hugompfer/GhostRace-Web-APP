const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../db/dbConnector');

/**
 * Função que permite atualizar uma sessão.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.put('/:id', (req, res) => {
    let sql = mysql.format('update sessao set dataSessao=?,idNivel=?,idSessaoContra=?,personagem=?,idUtilizador=? where idSessao=?', [new Date(req.body.date),
    parseInt(req.body.level), parseInt(req.body.sessionAgainst), req.body.character, parseInt(req.body.player), parseInt(req.params.id)]);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: err });;
        res.json({ success: true, sessions: result });
    });
});

/**
 * Função que permite eliminar uma sessão.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.delete('/:id', (req, res) => {
    var sql = mysql.format("Delete from sessao where idSessao=?", req.params.id);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, err });;
        res.json({ success: true, user: result });
    });
});

/**
 * Função que permite criar uma sessão.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.post('/', (req, res) => {
    let sql = mysql.format('insert into sessao(dataSessao,idNivel,idSessaoContra,personagem,idUtilizador) values(?,?,?,?,?);', [new Date(req.body.date),
    parseInt(req.body.level), parseInt(req.body.sessionAgainst), req.body.character, parseInt(req.body.player)]);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: err });;
        res.json(result);
    });
});

/**
 * Função para retornar a sessão com um determinado id.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/:id', (req, res) => {
    let sql = mysql.format('SELECT * FROM sessao where idSessao=?', req.params.id);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: "session not found" });;
        //res.send(result);
        res.json({ success: true, sessions: result });
    });
});

/**
 * Função para retornar a lista de sessões.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/', (req, res) => {
    if (req.session.user) {
        let sql = mysql.format('SELECT * FROM sessao');
        let query = db.query(sql, (err, result) => {
            if (err) throw res.json({ success: false, message: err });;
            //res.send(result);
            res.json({ success: true, sessions: result });
        });
    }else{
        res.status(401).send();
    }
});

module.exports = router;