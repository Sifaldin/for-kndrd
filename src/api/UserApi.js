import Api from "./Api";

class UserApi {

    BASE_URL = "http://localhost:8080";

    updateUser(currentUser) {
        return Api.put('/user', currentUser);
    }

    getUserByName(name) {
        return Api.get(`/user/${name}`);
    }

}

export default new UserApi();