import Api from './Api';

class AuthApi {
  authenticate({ email, password, name, imageUrl }) {
    return Api.post('/authenticate', { email, password, name, imageUrl });
  }

  register({ name, email, password }) {
    return Api.post('/register', { name, email, password });
  }

  getEmail() {
    return Api.get('/user');
  }
}

export default new AuthApi();
