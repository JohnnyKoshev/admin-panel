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

    deleteOne(id) {
        this.productsData = this.productsData.filter((product: any) => product.id !== id);
    }

    deleteMany(ids) {
        this.productsData = this.productsData.filter((product: any) => !ids.includes(product.id));
    }

}

const productsStore = new ProductsStore();
export default productsStore;
