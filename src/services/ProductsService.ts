import axiosInstance from "../utils/axios";
import IProduct from "../interfaces/IProduct";
import {AxiosResponse} from "axios";

interface IProductsService {
    getProducts: () => Promise<{
        limit: number;
        products: IProduct[];
        skip: number;
        total: number;
    }>;
    deleteOne: (id: number) => Promise<boolean>;
    deleteMany: (ids: number[]) => Promise<boolean>;
    search: (searchTerm: string) => Promise<IProduct[]>;
    addOne: (product: IProduct) => Promise<IProduct | null>;
    updateOne: (product: IProduct) => Promise<IProduct | null>;
}

const ProductsService: IProductsService = {
    getProducts: async () => {
        try {
            const response = await axiosInstance.get('/products', {
                params: {
                    limit: 0
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    deleteOne: async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/products/${id}`);
            return response.data.isDeleted;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    deleteMany: async (ids: number[]) => {
        try {
            let check: boolean = true;
            for (let id of ids) {
                const response = await axiosInstance.delete(`/products/${id}`);
                if (!response.data.isDeleted)
                    check = false;
            }
            return check;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    search: async (searchTerm: string): Promise<IProduct[]> => {
        try {
            const response = await axiosInstance.get('/products/search', {
                params: {
                    limit: 0,
                    q: searchTerm
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    addOne: async (product: IProduct): Promise<IProduct | null> => {
        try {
            const response: AxiosResponse = await axiosInstance.post('/products/add', product);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updateOne: async (product: IProduct): Promise<IProduct | null> => {
        try {
            const body = {};
            for (let key in product) {
                if (product[key] !== null && product[key] !== undefined && key !== 'id') {
                    body[key] = product[key];
                }
            }
            const response: AxiosResponse = await axiosInstance.put(`/products/${product.id}`, body);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

export default ProductsService;