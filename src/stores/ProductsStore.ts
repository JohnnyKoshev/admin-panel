import {makeAutoObservable} from "mobx";
import IProduct from "../interfaces/IProduct";

class ProductsStore {
    productsData: IProduct[] = []

    constructor() {
        makeAutoObservable(this);
    }

    set data(data) {
        this.productsData = data;
    }

    get data() {
        return this.productsData;
    }

    deleteOne(id: number) {
        this.productsData = this.productsData.filter((product: any) => product.id !== id);
    }

    deleteMany(ids: number[]) {
        this.productsData = this.productsData.filter((product: any) => !ids.includes(product.id));
    }

}

const productsStore = new ProductsStore();
export default productsStore;
