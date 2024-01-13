import {makeAutoObservable} from "mobx";

class TodosStore {
    todosData = []

    constructor() {
        makeAutoObservable(this);
    }

    set todos(data) {
        this.todosData = data;
    }

    get todos() {
        return this.todosData;
    }

}

const todosStore = new TodosStore();
export default todosStore;
