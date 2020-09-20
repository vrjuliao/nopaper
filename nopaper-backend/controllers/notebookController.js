var Notebook = require('../models/notebookModel');
const dayjs = require('dayjs')

exports.find = function (req, res) {
  Notebook.find({ userId: req.body.userId }, ['_id', 'name', 'description', 'createdAt'])
    .sort({ updatedAt: -1 })
    .exec(function (err, success) {
      if (err) return res.status(501).send('Notebook não foi encontrado');

      let response = success.map(notebook => {
        let result = notebook.toJSON();
        return {
          ...result,
          createdAt: dayjs(notebook.createdAt).format('DD/MM/YYYY')
        }
      });
      return res.send(response);
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
