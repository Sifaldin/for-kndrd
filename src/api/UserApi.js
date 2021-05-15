import Api from "./Api";

class UserApi {

    BASE_URL = "http://localhost:8080";


    checkUser(name) {
        return Api.get(`/user/check/${name}`)
    }

    addFollower(name, currentUser) {
        return Api.put(`/user/${name}/follow`, currentUser);
    }

    addUser(currentUser) {
        return Api.post('/user', currentUser);
    }

    updateUser(currentUser) {
        return Api.put('/user', currentUser);
    }

    getUserByName(name) {
        return Api.get(`/user/${name}`);
    }

}

export default new UserApi();