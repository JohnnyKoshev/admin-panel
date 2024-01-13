import {makeAutoObservable} from "mobx";

class UsersStore {
    usersData = []

    constructor() {
        makeAutoObservable(this);
    }

    set users(data) {
        this.usersData = data;
    }

    get users() {
        return this.usersData;
    }

}

const usersStore = new UsersStore();
export default usersStore;
