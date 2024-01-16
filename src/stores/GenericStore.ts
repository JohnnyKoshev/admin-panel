import {makeAutoObservable} from "mobx";

interface IBase {
    id: number;
}

class GenericStore<T extends IBase> {
    storeData: T[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    set data(data: T[]) {
        this.storeData = data;
    }

    get data() {
        return this.storeData;
    }

    deleteOne(id: number) {
        this.storeData = this.storeData.filter(item => item.id !== id);
    }

    deleteMany(ids: number[]) {
        this.storeData = this.storeData.filter(item => !ids.includes(item.id));
    }

    addOne(item: T) {
        this.storeData.push(item);
    }

    updateOne(item: T) {
        this.storeData = this.storeData.map(it => it.id === item.id ? item : it);
    }

    getIds() {
        return this.storeData.map(item => item.id);
    }

    search(searchTerm: string) {
        if (this.storeData[0].hasOwnProperty('todo')) {
            const regex = new RegExp(searchTerm, 'i');
            return this.storeData.filter((todo: any) => regex.test(todo.todo));
        }
        return this.storeData;
    }

}

export default GenericStore;
