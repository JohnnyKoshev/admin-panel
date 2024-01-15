import {makeAutoObservable} from "mobx";
import ITodo from "../interfaces/ITodo";

class TodosStore {
    todosData: ITodo[] = []

    constructor() {
        makeAutoObservable(this);
    }

    set data(data) {
        this.todosData = data;
    }

    get data() {
        return this.todosData;
    }

    deleteOne(id: number) {
        this.todosData = this.todosData.filter((todo: any) => todo.id !== id);
    }

    deleteMany(ids: number[]) {
        this.todosData = this.todosData.filter((todo: any) => !ids.includes(todo.id));
    }

    search(searchTerm: string) {
        const regex = new RegExp(searchTerm, 'i');
        return this.todosData.filter((todo: any) => regex.test(todo.todo));
    }

    addOne(todo: ITodo) {
        this.todosData.push(todo);
    }

    getIds() {
        return this.todosData.map((todo: ITodo) => todo.id);
    }
}

const todosStore = new TodosStore();
export default todosStore;
