var Notebook = require('../models/notebookModel');
const dayjs = require('dayjs')
var Note = require('../models/noteModel');

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

exports.delete = (req, res) => {
  Notebook.findById(req.query.id, (err, success) => {
    if (err) return res.status(400).send('Id invalido.');
    if (success.userId.toString() !== req.body.userId)
      return res.status(403).send('Proibido. Notebook não te pertence.');
    success.deleteOne((err) => {
      if (err) return res.status(500).send('Não foi possivel deletar o notebook. Tente novamente mais tarde.');
    });
    return res.send('Notebook deletado com sucesso.');
  });
};

exports.clone = async (req, res) => {
  try {
    const oldNotebook = await Notebook.findById(req.body.id);
    const newNotebook = new Notebook({
      name: oldNotebook.name,
      description: oldNotebook.description,
      userId: req.body.userId,
    });
    const newNBId = (await newNotebook.save())._id;
    const notes = await Note.find({ notebookId: oldNotebook._id });
    if (notes) {
      for (const note of notes) {
        const newNote = new Note({
          title: note.title,
          markdown: note.markdown,
          notebookId: newNBId,
        });
        await newNote.save();
      }
    }
    return res.send('Notebook clonado com sucesso!');
  } catch (err) {
    return res.status(500).send('Não foi possivel clonar o caderno');
  }
};
