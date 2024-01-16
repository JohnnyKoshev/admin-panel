import IProduct from "../interfaces/IProduct";
import GenericService from "./GenericService";

const ProductsService = new GenericService<IProduct>('products');
export default ProductsService;