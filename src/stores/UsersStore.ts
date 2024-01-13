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

    deleteOne(id) {
        this.usersData = this.usersData.filter((user: any) => user.id !== id);
    }

    deleteMany(ids) {
        this.usersData = this.usersData.filter((user: any) => !ids.includes(user.id));
    }

}

const usersStore = new UsersStore();
export default usersStore;
