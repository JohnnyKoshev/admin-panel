import {makeAutoObservable} from "mobx";
import IUser from "../interfaces/IUser";

class UsersStore {
    usersData: IUser[] = []

    constructor() {
        makeAutoObservable(this);
    }

    set data(data) {
        this.usersData = data;
    }

    get data() {
        return this.usersData;
    }

    deleteOne(id: number) {
        this.usersData = this.usersData.filter((user: any) => user.id !== id);
    }

    deleteMany(ids: number[]) {
        this.usersData = this.usersData.filter((user: any) => !ids.includes(user.id));
    }

    addOne(user: IUser) {
        this.usersData.push(user);
    }

    getIds() {
        return this.usersData.map((user: IUser) => user.id);
    }

}

const usersStore = new UsersStore();
export default usersStore;
