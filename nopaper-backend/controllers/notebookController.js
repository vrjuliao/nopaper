var Notebook = require('../models/notebookModel');

exports.find = function (req, res) {
  Notebook.find({ userId: req.body.userId }, ['_id', 'name', 'description', 'createdAt'], { _id: 0, userId: 0 })
    .sort({ updatedAt: -1 })
    .exec(function (err, success) {
      if (err) return res.status(501).send('Notebook não foi encontrado');
      return res.send(success);
    });
};

exports.new = function (req, res) {
  let notebook = new Notebook({
    name: req.body.name,
    description: req.body.description,
    userId: req.body.userId,
  });
  notebook.save(function (err) {
    if (err) {
      return res.status(501).send('Notebook não foi criado');
    }
    res.send('Notebook criado com sucesso');
  });
};

exports.delete = (req, res) => {
  Notebook.findById(req.body.id, (err, success) => {
    if (err) return res.status(400).send('Id invalido.');
    console.log('!' + success.userId + '!' + req.body.userId + '!');
    if (success.userId.toString() !== req.body.userId)
      return res.status(403).send('Proibido. Notebook não te pertence.');
    success.deleteOne((err) => {
      if (err) return res.status(500).send('Não foi possivel deletar o notebook. Tente novamente mais tarde.');
    });
    return res.send('Notebook deletado com sucesso.');
  });
};
