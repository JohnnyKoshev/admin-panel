import {makeAutoObservable} from "mobx";

class TodosStore {
    todosData = []

    constructor() {
        makeAutoObservable(this);
    }

    set data(data) {
        this.todosData = data;
    }

    get data() {
        return this.todosData;
    }

    deleteOne(id) {
        this.todosData = this.todosData.filter((todo: any) => todo.id !== id);
    }

    deleteMany(ids) {
        this.todosData = this.todosData.filter((todo: any) => !ids.includes(todo.id));
    }

    search(searchTerm) {
        const regex = new RegExp(searchTerm, 'i'); // 'i' for case-insensitive
        return this.todosData.filter((todo: any) => regex.test(todo.todo));
    }
}

const todosStore = new TodosStore();
export default todosStore;
