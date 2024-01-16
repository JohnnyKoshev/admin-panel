import IProduct from "../interfaces/IProduct";
import GenericStore from "./GenericStore";

const productsStore = new GenericStore<IProduct>();
export default productsStore;
