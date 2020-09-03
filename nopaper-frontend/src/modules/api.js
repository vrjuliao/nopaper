import axios from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:8000/';

const api = axios.create({
  baseURL
});

async function get(path) {
  try {
    const response = await api.get(path, { cache: false });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function post(path, data) {
  try {
    const response = await api.post(path, data, { crossdomain: true });
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

async function patch(path, data) {
  try {
    const response = await api.patch(path, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function del(path) {
  try {
    const response = await api.delete(path);
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

export default {
  login,
  register
};


