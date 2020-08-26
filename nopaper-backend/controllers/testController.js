var Smartphone = require('../models/smartphonesModel');

exports.test = function (req, res) {
    res.send('Olá! Teste ao Controller');
};

//Adicionar smartphone à BD
exports.create = function (req, res) {
    console.log(req.body);

    let smartphone = new Smartphone({
        nome: req.body.nome,
        marca: req.body.marca
    });
    smartphone.save(function (err) {
        if (err) {
            return res.status(501).send('Registo de Smartphone não foi criado')
        }
        res.send('Registo de Smartphone criado com sucesso')
    });
   
};

exports.details = function (req, res) {
    Smartphone.find({marca: req.params.id}, function (err, product) {
        if(err) return res.status(501).send('Registo de Smartphone não encontrado');
        res.send(product);
    });
};