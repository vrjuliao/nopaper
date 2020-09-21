var User = require('../models/userModel');

exports.all = function (req, res){
    User.find({
        _id: {$ne: req.body.userId}
    }, ['username', 'email', 'name', '_id'],function (err, success){
        if(err)
            return res.status(400).send('Usuários não obtidos');
        return res.send(success);
    });
}