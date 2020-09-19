var Notebook = require('../models/notebookModel');
var Note = require('../models/noteModel');

exports.getNotesById = async (req, res) => {
  try {
    await Notebook.find({ _id: req.body.id, userId: req.body.userId });
    const notes = await Note.find({ notebookId: req.body.id }, [
      '_id',
      'title',
      'markdown',
      'notebookId',
      'createdAt',
    ]).sort({ updatedAt: -1 });
    return res.send(notes);
  } catch (err) {
    return res.status(400).send('Notebook id inválido.');
  }
};

exports.setNewNote = async (req, res) => {
  if (!req.body.title || !req.body.markdown || !req.body.notebookId) {
    return req.status(400).send('Requisição invalida.');
  }
  try {
    await Notebook.find({ _id: req.body.id, userId: req.body.userId });
    let note = new Note({
      title: req.body.title,
      markdown: req.body.markdown,
      notebookId: req.body.notebookId,
    });
    note.save((err) => {
      if (err) return res.status(501).send('Não foi possivel criar nota.');
      return res.send('Nota criada com sucesso.');
    });
  } catch {
    return res.status(400).send('Notebook id inválido.');
  }
};
