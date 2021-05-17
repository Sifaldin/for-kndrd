import Auth from '../services/Auth';
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

  logGoogleUserIn = (user) => {
    Auth.login({
      email: user.email,
      password: user.nickname,
      name: user.name,
      imageUrl: user.picture,
    });
  };
}

export default new AuthApi();
