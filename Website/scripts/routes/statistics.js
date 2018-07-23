const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../db/dbConnector');

/**
 * Função que permite atualizar uma estatistica.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.put('/:id', (req, res) => {
    let sql = mysql.format('update estatistica set valor=?,idTipoEstatistica=?,idSessao=? where idEstatistica=?', [req.body.value,
    parseInt(req.body.type), parseInt(req.body.idSession), parseInt(req.params.id)]);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: err });;
        res.json({ success: true, message: result });
    });
});

/**
 * Função que permite remover uma estatistica.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.delete('/:id', (req, res) => {
    var sql = mysql.format("Delete from estatistica where idEstatistica=?", req.params.id);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, err });;
        res.json({ success: true, user: result });
    });
});

/**
 * Função que permite criar uma estatistica.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
router.post('/', (req, res) => {
    let sql = mysql.format('insert into estatistica(valor,idTipoEstatistica,idSessao) values("?",?,?);', [req.body.value,
    parseInt(req.body.type), parseInt(req.body.idSession)]);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: err });;
        res.json(result);
    });
});

/**
 * Função para retornar o ranking por vitorias.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/ranking', (req, res) => {
    let sql = mysql.format(`SELECT u.username,count(*) as vitorias
                        FROM ghostrace.estatistica est inner join ghostrace.sessao s on 
                        est.idSessao=s.idSessao
                        inner join utilizador u on s.idUtilizador=u.idUtilizador
                        where est.idTipoEstatistica=1 and est.valor="Vitoria" 
                        group by s.idUtilizador
                        order by valor;`);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: err });;
        res.json({ success: true, statistics: result });
    });
});

/**
 * Função para retornar o ranking por tempo jogado.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/timeplayed', (req, res) => {
    let sql = mysql.format(`SELECT u.username,TRUNCATE(sum(e.valor),2) as tempojogado
                        FROM ghostrace.sessao s inner join utilizador u on s.idUtilizador=u.idUtilizador
                        inner join ghostrace.estatistica e on e.idSessao= s.idSessao
                        where e.idTipoEstatistica=2
                        group by s.idUtilizador
                        order by tempojogado desc;`);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: err });;
        res.json({ success: true, statistics: result });
    });
});

/**
 * Função para retornar a lista de pessoas por pais.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/country', (req, res) => {
    let sql = mysql.format(`SELECT u.pais,count(u.idUtilizador) as NumeroDeJogadores
                        FROM ghostrace.utilizador u 
                        group by u.pais
                        order by NumeroDeJogadores desc;`);
    let query = db.query(sql, (err, result) => {
        if (err) throw res.json({ success: false, message: err });;
        res.json({ success: true, statistics: result });
    });
});

/**
 * Função para retornar a lista de estatisticas.
 * @param {*} req 
 * @param {*} res 
 */
router.get('/', (req, res) => {
    if (req.session.user) {
        let sql = mysql.format('SELECT * FROM estatistica');
        let query = db.query(sql, (err, result) => {
            if (err) throw res.json({ success: false, message: err });;
            res.json({ success: true, statistics: result });
        });
    }else{
        res.status(401).send();
    }
});



module.exports = router;