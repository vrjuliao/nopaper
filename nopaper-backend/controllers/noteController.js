var Notebook = require('../models/notebookModel');
var Note = require('../models/noteModel');

exports.getNotesById = async (req, res) => {
  try {
    await Notebook.find({ _id: req.query.id, userId: req.body.userId });
    const notes = await Note.find({ notebookId: req.query.id }, [
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
    return res.status(400).send('Requisição invalida.');
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
      return res.send('Nota criada com sucesso!');
    });
  } catch (err) {
    return res.status(400).send('Notebook id inválido.');
  }
};

exports.updateNote = async (req, res) => {
  console.log("OOOKOKOKOKOKOK");
  try {
    await Notebook.find({ _id: req.body.notebookId, userId: req.body.userId });
    try {
      await Note.findByIdAndUpdate(req.body.noteId, { title: req.body.title, markdown: req.body.markdown });
      return res.send('Nota atualizada com sucesso!');
    } catch (err) {
      return res.status(400).send('Note id inválido.');
    }
  } catch (err) {
    return res.status(400).send('Notebook id inválido.');
  }
};

exports.deleteNote = async (req, res) => {
  try {
    await Notebook.find({ _id: req.query.notebookId, userId: req.query.userId });
    try {
      await Note.findByIdAndDelete(req.query.noteId);
      res.send('Nota deletada com sucesso!');
    } catch (err) {
      return res.status(400).send('Note id inválido.');
    }
  } catch (err) {
    return res.status(400).send('Notebook id inválido.');
  }
};

exports.cloneNote = (req, res) => {
  Note.findById(req.body.noteId, (err, success) => {
    if (err) return res.status(400).send('Note id inválido.');
    var nova = new Note({
      title: success.title + 'Copy',
      markdown: success.markdown,
      notebookId: req.body.notebookId,
    });
    nova.save((err) => {
      if (err) return res.status(501).send('Não foi copiar criar nota.');
      return res.send('Nota clonada com sucesso!');
    });
  });
};
