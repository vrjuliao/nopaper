import axios from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:8000/';

const api = axios.create({
  baseURL
});

async function get(path, data) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await api.get(path, { headers: {
      'x-access-token': token
    }, 
    params: data,
    data: data,
    cache: false });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function post(path, data) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await api.post(path, data, { headers: {
      'x-access-token': token
    }, crossdomain: true });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400){
      return Promise.reject({
        error,
        message: error.response.data.message
      });
    }
    return Promise.reject(error);
  }
}

async function put(path, data) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await api.put(path, data, { headers: {
      'x-access-token': token
    }});
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function del(path, data) {
  try {
    const token = sessionStorage.getItem('token');
    const response = await api.delete(path, { headers: {
      'x-access-token': token
    },
    params: data,
    data: data,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// Requests

async function login(email, password) {
  try {
    const response = await post("/login", {
      email,
      pwd: password
    });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function register(name, email, password) {
  try {
    const response = await post("/register", {
      email,
      nome: name,
      pwd: password
    });
    console.log(response);
  } catch (error) {
    throw new Error(error.message || 'Erro');
  }
}

async function getUserNotebooks() {
  try {
    const notebooks = await get("/notebook");
    return notebooks;
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

async function createNewNotebook(name, description = "") {
  try {
    await post("/notebook/new" , {
      name,
      description
    });
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

async function createNewNote(title, markdown, notebookId){
  try {
    await post("/note/new" , {
      title,
      markdown,
      notebookId
    });
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

async function getUserNotes(notebookId) {
  try {
    const notes = await get("/note/get", {
      id: notebookId
    });
    return notes;
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

async function deleteNotebook(notebookId) {
  try {
    await del("/notebook/delete", {
      id: notebookId
    });
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

async function deleteNote(noteId, notebookId) {
  try {
    await del("/note/delete", {
      notebookId,
      noteId
    });
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

async function editNotebookName(notebookId, name) {
  console.log(notebookId, name);
  try {
    await put("/notebook/update", {
      notebookId,
      name
    });
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

async function editNote(noteId, notebookId, title, markdown) {
  try {
    await put("/note/update", {
      noteId,
      notebookId,
      title,
      markdown
    })
  } catch (err) {
    throw new Error(err.message || 'Erro');
  }
}

//new note
//list note
//crair campo username

export default {
  login,
  register,
  getUserNotebooks,
  createNewNotebook,
  createNewNote,
  getUserNotes,
  deleteNotebook,
  deleteNote,
  editNotebookName,
  editNote
};


