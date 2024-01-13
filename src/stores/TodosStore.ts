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

    deleteOne(id) {
        this.todosData = this.todosData.filter((todo: any) => todo.id !== id);
    }

    deleteMany(ids) {
        this.todosData = this.todosData.filter((todo: any) => !ids.includes(todo.id));
    }
}

const todosStore = new TodosStore();
export default todosStore;
