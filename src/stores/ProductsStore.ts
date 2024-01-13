import {makeAutoObservable} from "mobx";

class ProductsStore {
    productsData = []

    constructor() {
        makeAutoObservable(this);
    }

    set products(data) {
        this.productsData = data;
    }

    get products() {
        return this.productsData;
    }

}

const productsStore = new ProductsStore();
export default productsStore;
