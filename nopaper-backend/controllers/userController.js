var User = require('../models/userModel');

exports.all = function (req, res){
    User.find({}, ['username', 'email', 'name'],function (err, success){
        if(err)
            return res.status(400).send('Usuários não obtidos');
        return res.send(success);
    });
}